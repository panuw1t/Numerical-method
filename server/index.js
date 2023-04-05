const express = require("express");
const mysql = require("mysql");

const app = express();

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: 'root',
//     password: "pech2544za",
//     database: 'numerical',
// });

// connection.connect((error) => {
//     if (error) throw error;
//     console.log('Connected to MySQL server');
// });

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send("Hello panuvit");
});

app.get("/sample/:method/:number", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    pool.getConnection((err, connection) => {
        if (err) throw err;
    
        const sql = `SELECT info FROM Sample WHERE method = \"${req.params.method}\" and sample = ${req.params.number}`;

        connection.query(sql, (err, result) => {
          connection.release(); // release the connection back to the pool
    
          if (err) throw err;
          res.json(result);

        });
    });
    // connection.query(`SELECT info FROM sample WHERE method = \"${req.params.method}\" and sample = ${req.params.number}`, (err, results) => {
    //     if (err) {
    //       throw err;
    //     }
    //     res.json(results);
    // });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("server start port at " + port);
});