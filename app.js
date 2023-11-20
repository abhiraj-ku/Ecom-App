const express = require("express");
const app = express();
require("dotenv").config();

//basic route
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the tshirt store backend made by Abhishek kumar</h1>"
  );
});

//export app
module.exports = app;
