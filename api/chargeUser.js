import https from "https";

export default function chargeUser(req, res) {
  const TEST_KEY = process.env.VITE_PAYSTACK_TEST_SECRET_KEY;
  const LIVE_KEY = process.env.VITE_PAYSTACK_LIVE;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const params = JSON.stringify({
    authorization_code: req.body.authorization_code,
    email: req.body.email,
    amount: req.body.amount * 100,
    currency: "NGN",
  });
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/charge_authorization",
    method: "POST",
    headers: {
      Authorization: `Bearer ${LIVE_KEY}`,
      "Content-Type": "application/json",
    },
  };
  // send the request to paystack;
  const paystackReq = https.request(options, (paystackRes) => {
    let data = "";
    paystackRes.on("data", (chunk) => {
      data += chunk;
    });
    paystackRes.on("end", () => {
      console.log("Paystack Response:", data); // Log Paystack response for debugging
      res.json(JSON.parse(data));
    });
  });

  // Handle request error
  paystackReq.on("error", (error) => {
    console.error("Request error:", error);
    res.status(500).send(error);
  });

  paystackReq.write(params);
  paystackReq.end();
}
