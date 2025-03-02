// import { db } from "../services/";

import { createClient } from "@libsql/client";

async function addUserAuthDetails(webhookData) {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  try {
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

export default addUserAuthDetails;
