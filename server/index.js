const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require("mysql");
const swaggerUi = require("swagger-ui-express");    
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
 }));

// Secret key used to sign and verify tokens
const secretKey = 'amongus';

// Middleware function to verify JWT in the Authorization header
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
      const token = authHeader;
      try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).send('Invalid token');
      }
    } else {
      res.status(401).send('Missing Authorization header');
    }
};


// Use the Swagger UI middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


app.get("/", (req, res) => {    
    res.send("Hello panuvit");
});

// Route to generate and send a JWT to the client on the first request
app.get('/generate/:name', (req, res) => {    
  const user = { name: req.params.name };
  const token = jwt.sign(user, secretKey);
  res.send(token);
});

// Protected route that requires a valid JWT in the Authorization header
app.get('/protected', verifyToken, (req, res) => {    
  res.send(`Welcome, ${req.user.name}!`);
});

app.get("/sample/:method/:number", (req, res) => {    
    pool.getConnection((err, connection) => {
        if (err) throw err;
    
        const sql = `SELECT info FROM Sample WHERE method = \"${req.params.method}\" and sample = ${req.params.number}`;

        connection.query(sql, (err, result) => {
          connection.release(); // release the connection back to the pool
    
          if (err) throw err;
          res.json(result);

        });
    });
});

// Route for non-existing path
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});


// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send('404 not found');
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("server start port at " + port);
});