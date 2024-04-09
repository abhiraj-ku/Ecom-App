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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//coookie and fileUpload middlewares
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//setting up template engine
app.set("view engine", "ejs");

//morgon middleware needs to be on top (this is logger which logs users activity)
app.use(morgon("tiny"));

//import all the routes here
const homeRoute = require("./routes/homeRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const paymentRoute = require("./routes/paymentRoute");
//router middleware
app.use("/api/v1", homeRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", paymentRoute);

//test route for template engine
app.get("/signuptest", (req, res) => {
  res.render("signuptest");
});

//export app
module.exports = app;
