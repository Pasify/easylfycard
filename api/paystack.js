import https from "https";
import { env } from "process";

export default function initializePayment(req, res) {
  const KEY = env.VITE_PAYSTACK_PUBLIC_KEY;
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
