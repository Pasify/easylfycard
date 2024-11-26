import { createClient } from "@libsql/client";
import https from "https";
import { RiEyeCloseFill } from "react-icons/ri";

const DB = (() => {
  const databaseURL = process.env.VITE_TURSO_DATABASE_URL;
  const authToken = process.env.VITE_TURSO_AUTH_TOKEN;
  return createClient({
    url: databaseURL,
    authToken: authToken,
  });
})();

async function addUserAuthDetails(webhookData) {
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
      customer: {
        email,
        first_name = null,
        last_name = null,
        phone = null,
      } = {},
    } = webhookData;

    // Validation: Ensure essential fields are present
    if (!email)
      throw new Error("Email is required to associate authorization.");
    if (!authorization_code || !signature) {
      throw new Error("Missing essential authorization details.");
    }

    // Ensure the email exists in card_users table
    const userExists = await DB.execute({
      sql: "SELECT email FROM card_users WHERE email = ?",
      args: [email],
    });

    if (userExists.rows.length === 0) {
      // Insert email into card_users table
      await DB.execute({
        sql: "INSERT INTO card_users (email, first_name, last_name, phone_number) VALUES (?, ?, ?, ?)",
        args: [email, first_name ?? account_name, last_name, phone],
      });
      console.log(`User with email ${email} added to card_users table.`);
    }
    // Insert data into user_authorizations table
    await DB.execute({
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

async function updateUserDetails(webhookData) {
  try {
    // Destructure the required fields from webhookData
    const {
      authorization_code,
      active,
      account_name,
      signature,
      customer: { email } = {},
    } = webhookData;

    // Validation: Ensure essential fields are present
    if (!email) throw new Error("Email is required to update authorization.");
    if (!authorization_code || !signature) {
      throw new Error("Missing essential authorization details.");
    }
    // Update user details in user_authorizations table
    const result = await DB.execute({
      sql: "UPDATE user_authorizations SET active =?  WHERE email =? AND authorization_code =? AND account_name =?",
      args: [active, email, authorization_code, account_name],
    });

    // Check the result for success
    if (result.rowsAffected === 0) {
      console.log(
        "No records were updated. Please check the provided details.",
      );
    }

    console.log(`User details updated for email: ${email}`);
    return { message: `User details for ${email} updated successfully.` };
  } catch (error) {
    throw new Error(`error updating user record ${error.message}`);
  }
}
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    console.log("Received webhook data:", req.body);
    const { data, event } = req?.body || {};

    if (!event) {
      console.warn("Event type is missing in the webhook request.");
      return res.status(400).json({ error: "Event type is required." });
    }
    switch (event) {
      case "direct_debit.authorization.created":
        // Add authorization details to database
        try {
          await addUserAuthDetails(data);
          console.log(
            "Authorization details successfully added to the database.",
          );
          return res
            .status(200)
            .json({ message: "Authorization details processed successfully." });
        } catch (error) {
          console.error("Error adding authorization details:", error);
          return res.status(500).json({
            error:
              "Failed to process direct_debit.authorization.created event.",
          });
        }
      case "direct_debit.authorization.active":
        try {
          await updateUserDetails(data);
          console.log("User details successfully updated in the database.");
          return res.status(200).json({
            message: "Authorization activation processed successfully.",
          });
        } catch (error) {
          console.error("Error updating authorization details:", error);
          return res.status(500).json({
            error: "Failed to process direct_debit.authorization.active event.",
          });
        }
      case "charge.success":
        console.log("Charge was successful:", data);
        return res
          .status(200)
          .json({ message: "Charge event logged successfully." });

      default:
        console.warn(`Unrecognized event type: ${event}`);
        return res
          .status(400)
          .json({ error: `Unrecognized event type: ${event}` });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
