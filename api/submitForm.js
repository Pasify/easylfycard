import pool from "./dbpool";

export default async function submitForm(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phoneNumber, gender, bank_statement } =
      req.body;

    try {
      const connection = await pool.getConnection();
      // Insert the data into the database
      const query = `
        INSERT INTO users (first_name, last_name, email, phone_number, gender, bank_statement)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connection.query(query, [
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        bank_statement,
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
