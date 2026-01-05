
export default async function handler(req: any, res: any) {
    // Enable CORS just in case, though PayHere is server-to-server usually
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    try {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error("Missing Supabase configuration in Vercel environment");
            res.status(500).json({ error: "Server Configuration Error" });
            return;
        }

        // Construct the Supabase Function URL
        // Ensure no double slashes if supabaseUrl ends with /
        const baseUrl = supabaseUrl.replace(/\/$/, "");
        const functionUrl = `${baseUrl}/functions/v1/payhere-notify`;

        console.log("Forwarding PayHere notification to:", functionUrl);

        // Forward the request to Supabase
        // We forward the body as JSON. req.body in Vercel functions (Node) is usually an object 
        // if content-type was application/json or x-www-form-urlencoded.
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseKey}`
            },
            body: JSON.stringify(req.body)
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error("Supabase Function Error:", response.status, responseText);
            res.status(response.status).send(responseText);
            return;
        }

        res.status(200).send("OK");
    } catch (error: any) {
        console.error("Proxy Error:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}
