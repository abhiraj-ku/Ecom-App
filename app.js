require("dotenv").config();
const express = require("express");
const app = express();
const morgon = require("morgan");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

//swagger and yaml documentation/configuration
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//coookie and fileUpload middlewares
app.use(cookieParser());
app.use(fileUpload());

//morgon middleware needs to be on top (this is logger which logs usera activity)
app.use(morgon("tiny"));

//import all the routes here
const homeRoute = require("./routes/homeRoute");
const userRoute = require("./routes/userRoute");

//router middleware
app.use("/api/v1", homeRoute);
app.use("/api/v1", userRoute);

//export app
module.exports = app;
