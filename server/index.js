const express = require("express");
const app = express()

const sample = [
    {"f(x)":"x^2 - 7", XL:0, XR:4, X:1, X1:1, X0:0 },
    {"f(x)":"x - cos(x)", XL:0, XR:1, X:1, X1:1, X0:0 },
    {"f(x)":"x^3 + 2*x^2 + 10*x - 20", XL:1, XR:2, X:1, X1:1, X0:0}
]


const fixed_point_example = [
    {"f(x)":"x^2 - x - 1", "g(x)":"1 + 1/x", X:1},
    {"f(x)":"x - cos(x)", "g(x)":"cos(x)", X:0},
    {"f(x)":"sin(x) - x^2", "g(x)":"sin(x)/x", X:1}
]

app.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send("Hello panuvit");
});

app.get("/sample/:number", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    
    switch(req.params.number){
        case "1":
            res.json(sample[0]);
            break;
        case "2":
            res.json(sample[1]);
            break;
        case "3":
            res.json(sample[2]);
            break;
        case "fix1":
            res.json(fixed_point_example[0]);
            break;
        case "fix2":
            res.json(fixed_point_example[1]);
            break;
        case "fix3":
            res.json(fixed_point_example[2]);
            break;
        default:
            res.status(404).send("404 not found you sample");
    }
});

const port = process.env.PORT || 3001;
app.listen(port);