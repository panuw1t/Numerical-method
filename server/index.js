const express = require("express");
const app = express()
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pech2544za',
    database: 'numerical',
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Connected to MySQL server');
});

app.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send("Hello panuvit");
});

app.get("/sample/:method/:number", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    connection.query(`SELECT info FROM sample WHERE method = \"${req.params.method}\" and sample = ${req.params.number}`, (err, results) => {
        if (err) {
          throw err;
        }
        res.json(results);
    });
});

const port = process.env.PORT || 3001;
app.listen(port);