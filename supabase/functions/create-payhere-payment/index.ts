import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHash } from "node:crypto";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        const { payment_id } = await req.json()

        if (!payment_id) {
            throw new Error("Missing payment_id")
        }

        // 1. Fetch Payment Details
        const { data: payment, error: paymentError } = await supabaseClient
            .from('payments')
            .select('amount, currency, registration_id')
            .eq('payment_id', payment_id)
            .single()

        if (paymentError || !payment) {
            throw new Error(`Payment not found: ${paymentError?.message}`)
        }

        // 2. Fetch Registration Details
        const { data: registration, error: regError } = await supabaseClient
            .from('registrations')
            .select('full_name, email, phone, address, city')
            .eq('registration_id', payment.registration_id)
            .single()

        if (regError || !registration) {
            throw new Error(`Registration not found: ${regError?.message}`)
        }

        // 3. Prepare PayHere Variables
        const merchantId = Deno.env.get('PAYHERE_MERCHANT_ID')
        const merchantSecret = Deno.env.get('PAYHERE_MERCHANT_SECRET')

        if (!merchantId || !merchantSecret) {
            throw new Error("Server Misconfiguration: Missing PayHere Secrets")
        }

        const projectRef = "qhzbujkbfacvxhjzetur"; // Hardcoded for reliability or extract from SUPABASE_URL
        const webhookUrl = `https://${projectRef}.supabase.co/functions/v1/payhere-notify`;

        const orderId = payment_id.toString();
        const amount = Number(payment.amount).toFixed(2); // Ensure 2 decimal places
        const currency = payment.currency;

        // 4. Generate Hash (using node:crypto)
        // Hash = UPPERCASE(MD5(merchant_id + order_id + amount + currency + UPPERCASE(MD5(merchant_secret))))

        const md5 = (content: string) => createHash('md5').update(content).digest('hex').toUpperCase();

        const hashedSecret = md5(merchantSecret);
        const hashString = `${merchantId}${orderId}${amount}${currency}${hashedSecret}`;

        console.log("DEBUG PAYHERE HASH:");
        console.log("Merchant ID:", merchantId);
        console.log("Order ID:", orderId);
        console.log("Amount:", amount);
        console.log("Currency:", currency);
        console.log("Hashed Secret (First 5):", hashedSecret.substring(0, 5));
        console.log("Pre-Hash String:", hashString);

        const finalHash = md5(hashString);

        // 5. Construct Payload
        const splitName = registration.full_name.split(" ");
        const firstName = splitName[0];
        const lastName = splitName.slice(1).join(" ") || "User";

        const payload = {
            merchant_id: merchantId,
            return_url: `${req.headers.get('origin')}/payment/success`, // Dynamically get origin
            cancel_url: `${req.headers.get('origin')}/payment/cancel`,
            notify_url: webhookUrl,
            order_id: orderId,
            items: "TEDx Ticket",
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
            sandbox: "1" // Or toggle based on env
        };

        return new Response(
            JSON.stringify(payload),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message, stack: error.stack }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )
    }
})
