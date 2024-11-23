import { db } from "./testdb";
export default async function createNewUser(newUserData) {
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
