import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const formData = await req.formData()

        // Log the incoming webhook for debugging
        const entries = Object.fromEntries(formData.entries());
        console.log("Webhook Received:", JSON.stringify(entries));

        const merchant_id = formData.get('merchant_id')?.toString()
        const order_id = formData.get('order_id')?.toString()
        const payhere_amount = formData.get('payhere_amount')?.toString()
        const payhere_currency = formData.get('payhere_currency')?.toString()
        const status_code = formData.get('status_code')?.toString()
        const md5sig = formData.get('md5sig')?.toString()

        const secret = Deno.env.get('PAYHERE_MERCHANT_SECRET')
        const envMerchantId = Deno.env.get('PAYHERE_MERCHANT_ID')

        if (!secret || !envMerchantId) {
            throw new Error("Missing Server Secrets")
        }

        if (merchant_id !== envMerchantId) {
            throw new Error("Invalid Merchant ID")
        }

        // Validate Hash
        // md5sig = UPPERCASE(MD5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + UPPERCASE(MD5(merchant_secret))))

        const toHex = (buffer: ArrayBuffer) => {
            return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join("");
        }

        const md5Async = async (str: string) => {
            const data = new TextEncoder().encode(str);
            const hashBuffer = await crypto.subtle.digest('MD5', data);
            return toHex(hashBuffer);
        }

        const hashedSecret = (await md5Async(secret)).toUpperCase();
        const hashString = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${hashedSecret}`;
        const calculatedSig = (await md5Async(hashString)).toUpperCase();

        if (calculatedSig !== md5sig) {
            console.error("Signature Mismatch:", { calculated: calculatedSig, received: md5sig });
            throw new Error("Invalid Signature")
        }

        // Hash Verified. Update Database.

        // Use SERVICE_ROLE_KEY to bypass RLS because the anonymous user cannot update these records arbitrarily
        // Note: For this to work, you must set SUPABASE_SERVICE_ROLE_KEY in secrets, 
        // OR use the default SUPABASE_SERVICE_ROLE_KEY provided by Supabase Edge Runtime if available (usually it is).
        // If not, we fall back to ANON key but RLS must allow update. 
        // BETTER: Use Service Role.

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? ''
        )

        let paymentStatus = 'Pending';
        if (status_code === '2') {
            paymentStatus = 'Success';
        } else if (status_code === '0') {
            paymentStatus = 'Pending';
        } else {
            paymentStatus = 'Failed';
        }

        const { error: updateError } = await supabaseAdmin
            .from('payments')
            .update({ status: paymentStatus })
            .eq('payment_id', order_id);

        if (updateError) {
            console.error("DB Update Failed:", updateError);
            throw new Error("Database Update Failed");
        }

        // If Success, also update Registration status?
        if (paymentStatus === 'Success') {
            // Fetch registration_id first? Or simple join update if possible.
            // We'll trust the payment update for now.
            console.log("Payment Marked as Success for ID:", order_id);
        }

        return new Response(
            JSON.stringify({ message: "Webhook Processed", status: paymentStatus }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )

    } catch (error) {
        console.error("Webhook Error:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )
    }
})
