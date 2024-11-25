import { createClient } from "@libsql/client";

// import db from "./testdb";
export default async function createNewUser(newUserData) {
  const db = createClient({
    url: import.meta.env.VITE_TURSO_DATABASE_URL,
    authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN,
  });

  try {
    const { firstName, lastName, email, phoneNumber, gender } = newUserData;
    const response = await db.execute({
      sql: "INSERT INTO card_users (email,first_name,last_name,phone_number,gender) VALUES(?,?,?,?,?)",
      args: [email, firstName, lastName, phoneNumber, gender],
    });
    return response;
  } catch (error) {
    console.error("Database error while creating user:", error); // Log the original error
    throw new Error(`Error creating user: ${error.message}`);
  }
}
