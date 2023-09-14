import mysql from "mysql2";

const connection = mysql.connection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "",
  password: "",
  multipleStatements: true,
});

export default connection;
