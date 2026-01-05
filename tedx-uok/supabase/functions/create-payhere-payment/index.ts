import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHash } from "node:crypto";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_ANON_KEY") ?? "",
            {
                global: {
                    headers: { Authorization: req.headers.get("Authorization")! },
                },
            }
        );

        const { payment_id } = await req.json();

        if (!payment_id) {
            throw new Error("Missing payment_id");
        }

        const { data: payment, error: paymentError } = await supabaseClient
            .from("payments")
            .select("amount, currency, registration_id")
            .eq("payment_id", payment_id)
            .single();

        if (paymentError || !payment) {
            throw new Error(`Payment not found: ${paymentError?.message}`);
        }

        const { data: registration, error: regError } = await supabaseClient
            .from("registrations")
            .select("full_name, email, phone, address, city")
            .eq("registration_id", payment.registration_id)
            .single();

        if (regError || !registration) {
            throw new Error(`Registration not found: ${regError?.message}`);
        }

        const merchantId = Deno.env.get("PAYHERE_MERCHANT_ID")?.trim();
        const merchantSecret = Deno.env.get("PAYHERE_MERCHANT_SECRET")?.trim();

        if (!merchantId || !merchantSecret) {
            throw new Error("Server Misconfiguration: Missing PayHere Secrets");
        }

        // Fix: Dynamically get URL to ensure webhook points to the right project
        const supabaseUrl = Deno.env.get("SUPABASE_URL")?.replace(/\/$/, "");

        // Use APP_URL for return/cancel, fallback to Vercel production
        const appUrl = Deno.env.get("APP_URL")?.replace(/\/$/, "") ?? "https://te-dx-uok.vercel.app";
        const webhookUrl = `${appUrl}/api/payhere/notify`;

        // Fix: PayHere Sandbox requires shorter, alphanumeric order_ids (max ~20 chars)
        // Using a prefix + first 12 chars of UUID avoids "Unauthorized" errors
        const orderId = `TEDX_${payment_id.toString().replace(/-/g, "").slice(0, 12).toUpperCase()}`;

        const amount = Number(payment.amount).toFixed(2);
        const currency = payment.currency;

        const md5 = (content: string) =>
            createHash("md5").update(content).digest("hex").toUpperCase();

        // Standard PayHere Hash Generation (All Uppercase)
        // hash = strtoupper(md5(merchant_id . order_id . amount . currency . strtoupper(md5(merchant_secret))))

        const hashedSecret = md5(merchantSecret); // Inner Hash MUST be Uppercase
        const hashString = `${merchantId}${orderId}${amount}${currency}${hashedSecret}`;

        console.log("DEBUG: Generating Hash (Standard Uppercase)");
        console.log("Merchant ID:", merchantId);
        console.log("Order ID:", orderId);
        console.log("Amount:", amount);
        console.log("Currency:", currency);
        console.log("Secret (Masked):", merchantSecret.substring(0, 5) + "...");
        console.log("Hashed Secret:", hashedSecret);
        console.log("Pre-Hash String:", hashString);
        console.log("Returns To:", appUrl);
        console.log("Notify Url:", webhookUrl);

        const finalHash = md5(hashString); // Outer Hash MUST be Uppercase

        const splitName = registration.full_name.split(" ");
        const firstName = splitName[0];
        const lastName = splitName.slice(1).join(" ") || "User";

        const payload = {
            merchant_id: merchantId,
            // Fix: Hardcode exact domain from PayHere Sandbox App to prevent "Unauthorized" Origin mismatch
            // AND IMPORTANT: Ideally the user should add 'http://localhost:5173' to Allowed Domains if testing locally
            return_url: `${appUrl}/payment/success`,
            cancel_url: `${appUrl}/payment/cancel`,
            notify_url: webhookUrl,
            order_id: orderId,
            items: "TEDx Ticket Enrollment",
            currency: currency,
            amount: amount,
            first_name: firstName,
            last_name: lastName,
            email: registration.email,
            phone: registration.phone,
            address: registration.address,
            city: registration.city,
            country: "Sri Lanka",
            hash: finalHash,
        };

        return new Response(JSON.stringify(payload), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
