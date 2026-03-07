import { serve } from "https://deno.land/std/http/server.ts";

/**
 * Create MD5 hash using Web Crypto (compatible with Supabase Edge Functions)
 */
async function md5(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  const { order_id, amount, currency } = await req.json();

  const merchantId = Deno.env.get("PAYHERE_MERCHANT_ID");
  const merchantSecret = Deno.env.get("PAYHERE_MERCHANT_SECRET");

  if (!merchantId || !merchantSecret) {
    return new Response("Missing PayHere secrets", { status: 500 });
  }

  const secretHash = (await md5(merchantSecret)).toUpperCase();

  const hash = (
    await md5(
      merchantId +
      order_id +
      amount +
      currency +
      secretHash
    )
  ).toUpperCase();

  return new Response(
    JSON.stringify({ hash }),
    { headers: { "Content-Type": "application/json" } }
  );
});
