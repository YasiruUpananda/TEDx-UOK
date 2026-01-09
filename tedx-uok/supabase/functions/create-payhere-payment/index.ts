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

    const merchantId = Deno.env.get("PAYHERE_MERCHANT_ID");
    const merchantSecret = Deno.env.get("PAYHERE_MERCHANT_SECRET");

    if (!merchantId || !merchantSecret) {
      throw new Error("Server Misconfiguration: Missing PayHere Secrets");
    }

    // Fix: Dynamically get URL to ensure webhook points to the right project
    const supabaseUrl = Deno.env.get("SUPABASE_URL")?.replace(/\/$/, "");
    const webhookUrl = `${supabaseUrl}/functions/v1/payhere-notify`;

    const orderId = payment_id.toString();
    const amount = Number(payment.amount).toFixed(2);
    const currency = payment.currency;

    const md5 = (content: string) =>
      createHash("md5").update(content).digest("hex").toUpperCase();

    const hashedSecret = md5(merchantSecret);
    const hashString = `${merchantId}${orderId}${amount}${currency}${hashedSecret}`;
    const finalHash = md5(hashString);

    const splitName = registration.full_name.split(" ");
    const firstName = splitName[0];
    const lastName = splitName.slice(1).join(" ") || "User";

    const payload = {
      merchant_id: merchantId,
      // Fix: Hardcode your Vercel domain to prevent "Unauthorized" errors
      return_url: `https://tedx-uok.vercel.app/payment/success`,
      cancel_url: `https://tedx-uok.vercel.app/payment/cancel`,
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
      // Fix: Toggle based on environment variable (0 = live, 1 = sandbox)
      sandbox: Deno.env.get("PAYHERE_IS_SANDBOX") === "0" ? "0" : "1",
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
