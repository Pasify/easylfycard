// import cors from "cors";
import pool from "./dbpool.js";

// const corsMiddleware = cors({
//   origin: "http://localhost:5173", // Allow frontend origins
//   methods: ["POST", "GET", "OPTIONS"], // Allowed methods
//   allowedHeaders: ["Content-Type"], // Allowed headers
// });
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }
export default async function submitForm(req, res) {
  // await runMiddleware(req, res, corsMiddleware);
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers

  if (req.method === "OPTIONS") {
    // Handle the preflight request
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (req.method === "POST") {
    console.log(req.body);
    const { firstName, lastName, email, phoneNumber, gender } = req.body;

    try {
      const connection = await pool.getConnection();
      // Insert the data into the database
      const query = `
        INSERT INTO easylyfcard_users (first_name, last_name, email, phone_number, gender)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connection.query(query, [
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        // bank_statement,
      ]);
      // Release the connection back to the pool
      connection.release();

      // Send a response
      res
        .status(200)
        .json({ message: "Data inserted successfully", id: result.insertId });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
