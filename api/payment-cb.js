import https from "https";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  console.log("Received webhook:", req.body);
  const { data } = req?.body || {};
  try {
    console.log("Received webhook data:", req.body);
    if (data) {
      console.log(data);
    }

    res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
