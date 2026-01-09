
import { createHash } from "node:crypto";
import * as fs from "node:fs";

const merchantId = "1233327";
const secret = "NDExMjI5MTQ2ODM5OTIzMzg2NzM0ODk4MjM0NzAzNDExNTM3NDg1";
const orderId = "TEST12345";
const amount = "100.00";
const currency = "LKR";

const md5 = (str: string) => createHash("md5").update(str).digest("hex").toUpperCase();

const hashedSecret = md5(secret);
const hashString = `${merchantId}${orderId}${amount}${currency}${hashedSecret}`;
const finalHash = md5(hashString);

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>PayHere Isolation Test</title>
</head>
<body>
    <h1>PayHere Isolation Test</h1>
    <p>Use this form to verify if your Merchant ID and Sandbox Account are active.</p>
    <p>Merchant ID: ${merchantId}</p>
    <p>Order ID: ${orderId}</p>
    <p>Amount: ${amount} ${currency}</p>
    <p>Hash: ${finalHash}</p>
    
    <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
        <input type="hidden" name="merchant_id" value="${merchantId}" />
        <input type="hidden" name="return_url" value="http://localhost:5173/payment/success" />
        <input type="hidden" name="cancel_url" value="http://localhost:5173/payment/cancel" />
        <input type="hidden" name="notify_url" value="http://localhost:5173/api/payhere/notify" />
        <input type="hidden" name="order_id" value="${orderId}" />
        <input type="hidden" name="items" value="Test Item" />
        <input type="hidden" name="currency" value="${currency}" />
        <input type="hidden" name="amount" value="${amount}" />
        <input type="hidden" name="first_name" value="Test" />
        <input type="hidden" name="last_name" value="User" />
        <input type="hidden" name="email" value="test@example.com" />
        <input type="hidden" name="phone" value="0771234567" />
        <input type="hidden" name="address" value="No.1, Galle Road" />
        <input type="hidden" name="city" value="Colombo" />
        <input type="hidden" name="country" value="Sri Lanka" />
        <input type="hidden" name="hash" value="${finalHash}" />
        <input type="submit" value="Pay Now" style="padding: 10px 20px; font-size: 16px; background-color: blue; color: white; cursor: pointer;" />
    </form>
</body>
</html>
`;

fs.writeFileSync("public/payhere_test.html", html);
console.log("Test file created at public/payhere_test.html");
