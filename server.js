const { name } = require("ejs");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
// const http = require("http");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// const server = http.createServer();
app.set("view engine", "ejs");
app.set("views", "views");

app.listen(8000, () => {
  console.log("server ready");
});

const db = mysql.createConnection({
  host: "localhost",
  database: "data_mhs",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database ready...");
  app.get("/", (req, res) => {
    const sql = "SELECT * FROM data_mhs";
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, judul: "Daftar Mahasiswa" });
    });
  });
  //insert data
  app.post("/add", (req, res) => {
    const insertSql = `INSERT INTO data_mhs (Name, Class) VALUES ('${req.body.nama}', '${req.body.kelas}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
  // app.post("/delete", (req, res) => {
  //   const deleteSql = `DELETE FROM data_mhs WHERE data_mhs . id = '${req.body.id}';`;
  //   db.query(deleteSql, (err, result) => {
  //     if (err) throw err;
  //     res.redirect("/");
  //   });
  // });
});
