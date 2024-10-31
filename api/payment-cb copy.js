import https from "https";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const KEY = process.env.VITE_PAYSTACK_TEST_SECRET_KEY;
    const hash = crypto
      .createHmac("sha512", KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      const event = req.body;
      // Step 3: Log or handle the event as needed
      console.log("Webhook event received:", event);
      // Step 4: Acknowledge receipt of the webhook
      res.status(200).json({ message: "Webhook received successfully" });
    } else {
      // Signature validation failed
      console.error("Signature verification failed");
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
