const express = require("express");
const app = express()
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'host.docker.internal',
    port: 3307,
    user: 'root',
    password: '1234',
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