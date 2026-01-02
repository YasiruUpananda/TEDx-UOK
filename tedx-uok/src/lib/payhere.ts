import { supabase } from "../api/supabaseClient";

interface PaymentDetails {
    order_id: string;
    amount: string;
    currency: string;
}

export const getPayHereHash = async ({ order_id, amount, currency }: PaymentDetails) => {
    const { data, error } = await supabase.functions.invoke("payhere-hash", {
        body: {
            order_id,
            amount,
            currency,
        },
    });

    if (error) {
        console.error("Supabase payment hash error:", error);
        throw new Error(`Payment hash generation failed: ${error.message || 'Unknown error'}`);
    }

    if (!data || !data.hash) {
        console.error("Invalid hash response:", data);
        throw new Error("Received invalid payment hash from server");
    }

    return data.hash;
};
