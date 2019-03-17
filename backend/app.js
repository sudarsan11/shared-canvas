const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const canvasRoutes = require('../backend/routes/canvas');


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});







app.use('/api/canvas/', canvasRoutes)

module.exports = app;
