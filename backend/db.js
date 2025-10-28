import mysql from "mysql2";


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "transporti_publik",
});

db.connect((err) => {
  if (err) console.error("Gabim në lidhjen me MySQL:", err);
  else console.log("Lidhja me MySQL u krye me sukses!");
});

export default db;
