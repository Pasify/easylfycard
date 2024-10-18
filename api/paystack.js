import https from "https";
import { env } from "process";

const KEY = env.VITE_PAYSTACK_PUBLIC_KEY;
export default function initializePayment(req, res) {
  console.log(KEY);
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Preflight request for CORS
    res.status(200).end();
    return;
  }

  // Your existing logic for handling the POST request
  // Example: interacting with the Paystack API
  //   res.status(200).json({ message: "CORS headers added!" });

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
      Authorization: `Bearer ${KEY}`, // Securely use secret key
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
