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

//morgon middleware needs to be on top
app.use(morgon("tiny"));

//import all the routes here
const home = require("./routes/home");

//router middleware
app.use("/api/v1", home);

//export app
module.exports = app;
