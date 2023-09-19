import mysql from "mysql2";
import "dotenv/config";

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
});

export default connection;
