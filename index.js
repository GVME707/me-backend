var express = require("express");
var cors = require("cors");
var app = express();
require("dotenv").config();

// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(cors());

app.get("/hello", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.get("/users", function (req, res, next) {
  connection.query("SELECT * FROM `users`", function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.listen(5000, "0.0.0.0", function () {
  console.log("CORS-enabled web server listening on port 5000");
});
