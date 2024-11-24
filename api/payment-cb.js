import https from "https";
import { addUserAuthDetails } from "../src/services";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const { data } = req?.body || {};
    console.log("Received webhook data:", req.body);
    if (data) {
      console.log("Processing webhook data:", data);

      // Pass the data object to addUserAuthDetails
      await addUserAuthDetails(data);
      console.log("Authorization details successfully added to the database.");
    } else {
      console.warn("No data found in webhook request.");
      return res
        .status(400)
        .json({ error: "No data provided in webhook request." });
    }

    res
      .status(200)
      .json({ message: "Webhook received  and processed successfully" });
    // verify the auth
    // call the verify.
    // log it to a txt file.
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
