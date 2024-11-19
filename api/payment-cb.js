import https from "https";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const { data } = req?.body || {};
    console.log("Received webhook data:", req.body);
    if (data) {
      console.log("response data:", data);
    }

    res.status(200).json({ message: "Webhook received successfully" });
    // verify the auth
    // call the verify.
    // log it to a txt file.
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
