import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "musicbase_db",
  password: "Anga0001kea",
  multipleStatements: true,
});

export default connection;
