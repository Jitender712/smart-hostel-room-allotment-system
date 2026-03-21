import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// const db = mysql.createConnection({
//  host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: {
//     minVersion: "TLSv1.2"
//   }
// });

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "", // add password if you set one
  database: "shras",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

export default db;