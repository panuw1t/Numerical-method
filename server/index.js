const app = require('./app.js')

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("server starts port at " + port);
});

module.exports = app;
