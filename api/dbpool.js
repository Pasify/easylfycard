import mysql from "mysql2/promise";
const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "paskkal",
  password: "Pascal6190##",
  database: "kxzxovhu_easylyfcard_users",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
