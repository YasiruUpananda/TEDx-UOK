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
        // 1. Parse Form Data
        const formData = await req.formData();
        const entries = Object.fromEntries(formData.entries());
        console.log("PayHere Notify Received:", JSON.stringify(entries));

        const merchant_id = formData.get('merchant_id')?.toString();
        const order_id = formData.get('order_id')?.toString();
        const payment_id = formData.get('payment_id')?.toString(); // PayHere sends existing payment_id
        const payhere_amount = formData.get('payhere_amount')?.toString();
        const payhere_currency = formData.get('payhere_currency')?.toString();
        const status_code = formData.get('status_code')?.toString();
        const md5sig = formData.get('md5sig')?.toString();

        // 2. Load Secrets
        const merchantSecret = Deno.env.get('PAYHERE_MERCHANT_SECRET');
        const envMerchantId = Deno.env.get('PAYHERE_MERCHANT_ID');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceRoleKey = Deno.env.get('SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!merchantSecret || !envMerchantId || !supabaseUrl || !supabaseServiceRoleKey) {
            console.error("Missing Secrets");
            throw new Error("Server Configuration Error");
        }

        if (merchant_id !== envMerchantId) {
            console.error("Merchant ID Mismatch", { received: merchant_id, expected: envMerchantId });
            throw new Error("Invalid Merchant ID");
        }

        // 3. Verify Signature
        // md5sig = UPPERCASE(MD5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + UPPERCASE(MD5(merchant_secret))))

        const md5 = (content: string) => createHash('md5').update(content).digest('hex').toUpperCase();

        const hashedSecret = md5(merchantSecret);
        const hashString = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${hashedSecret}`;
        const calculatedSig = md5(hashString);

        if (calculatedSig !== md5sig) {
            console.error("Signature Mismatch", { expected: calculatedSig, received: md5sig });
            throw new Error("Invalid Signature");
        }

        // 5. Process Payment based on status_code
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
        const systemPaymentId = order_id; // Payment ID (UUID)

        let paymentStatus = '';
        let registrationStatus = '';

        if (status_code === '2') {
            console.log("Status is 2 (Success).");
            paymentStatus = 'paid';
            registrationStatus = 'Confirmed';
        } else if (status_code === '-1') {
            console.log("Status is -1 (Canceled).");
            paymentStatus = 'cancelled';
            registrationStatus = 'Cancelled';
        } else if (status_code === '-2') {
            console.log("Status is -2 (Failed).");
            paymentStatus = 'failed';
            registrationStatus = 'Failed';
        } else {
            console.log(`Status Code is ${status_code}. Skipping DB Update.`);
            // Return OK early effectively
        }

        if (paymentStatus) {
            console.log(`Updating Database for status: ${paymentStatus}`);

            // Update Payments Table
            const { data: paymentData, error: paymentError } = await supabaseAdmin
                .from('payments')
                .update({
                    payment_status: paymentStatus,
                    payment_reference: payment_id, // PayHere's Payment ID
                    paid_at: new Date().toISOString()
                })
                .eq('payment_id', systemPaymentId)
                .select('registration_id') // We need this to update registration
                .single();

            if (paymentError || !paymentData) {
                console.error("Failed to update payment", paymentError);
                // If it's a cancellation usually we still want to log it, but if record missing it throws
                // We'll throw to log the error properly
            } else {
                const registrationId = paymentData.registration_id;

                // Update Registrations Table
                const { error: regError } = await supabaseAdmin
                    .from('registrations')
                    .update({
                        status: registrationStatus
                    })
                    .eq('registration_id', registrationId);

                if (regError) {
                    console.error("Failed to update registration", regError);
                } else {
                    console.log(`Registration ${registrationStatus}:`, registrationId);
                }
            }
        }

        // 6. Return OK
        return new Response("OK", {
            headers: { ...corsHeaders, "Content-Type": "text/plain" },
            status: 200
        });

    } catch (error) {
        console.error("PayHere Notify Error:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )
    }
})
