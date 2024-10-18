import https from "https";
// import { env } from "process";

const KEY = process.env.VITE_PAYSTACK_TEST_SECRETE_KEY;
export default function initializePayment(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Prepare the request to Paystack

  const params = JSON.stringify({
    email: req.body.email,
    channel: req.body.channel,
    callback_url: req.body.callback_url,
  });
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/customer/authorization/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${KEY}`, //  secret key
      "Content-Type": "application/json",
    },
  };

  const paystackReq = https.request(options, (paystackRes) => {
    let data = "";
    paystackRes.on("data", (chunk) => (data += chunk));
    paystackRes.on("end", () => res.json(JSON.parse(data)));
  });

  paystackReq.on("error", (error) => {
    res.status(500).send(error);
  });

  paystackReq.write(params);
  paystackReq.end();
}
