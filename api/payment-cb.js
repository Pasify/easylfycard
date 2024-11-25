import { createClient } from "@libsql/client";
import https from "https";
// import { addUserAuthDetails } from "../src/services";
// import addUserAuthDetails from "../src/services/addUserAuthDetails";

async function addUserAuthDetails(webhookData) {
  try {
    const databaseURl = process.env.VITE_TURSO_DATABASE_URL;
    const authToken = process.env.VITE_TURSO_AUTH_TOKEN;
    const db = createClient({
      url: databaseURl,
      authToken: authToken,
    });

    // Destructure the required fields from webhookData
    const {
      authorization_code,
      active,
      card_type,
      bank,
      reusable,
      account_name = null,
      signature,
      reference = null,
      customer: { email } = {},
    } = webhookData;

    // Validation: Ensure essential fields are present
    if (!email)
      throw new Error("Email is required to associate authorization.");
    if (!authorization_code || !signature) {
      throw new Error("Missing essential authorization details.");
    }

    // Insert data into user_authorizations table
    await db.execute({
      sql: "INSERT INTO user_authorizations (email, authorization_code, active, card_type, bank, reusable,  signature, account_name, reference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        email,
        authorization_code,
        active,
        card_type,
        bank,
        reusable,
        signature,
        account_name,
        reference,
      ],
    });
    console.log(`Authorization data successfully added for email: ${email}`);
    return { message: "User authorization details added successfully." };
  } catch (error) {
    console.error("Error adding user authorization data:", error.message);
    throw new Error(`Error Adding User Authentication Data ${error.message}`);
  }
}

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
