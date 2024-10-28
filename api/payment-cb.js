import https from "https";
export default async function handler(req, res) {
  try {
    // Log the entire request body to see exactly what Paystack is sending
    console.log("Received webhook data:", req.body);
    const { data } = req?.body || {};
    if (data) {
      console.log(data);
    }

    // Send a success response back to Paystack, acknowledging receipt of the webhook
    res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
