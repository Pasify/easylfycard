import mysql from "mysql2/promise";
const pool = mysql.createPool({
  host: "142.44.149.41",
  port: "3306",
  user: "kxzxovhu_admin",
  password: "sTc_TSVwcrRW",
  database: "kxzxovhu_easylyfcard_users",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

// sTc_TSVwcrRW
