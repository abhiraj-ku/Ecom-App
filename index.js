const app = require("./app");
const connectDb = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary");
// const mongoose = require("mongoose");

//connection with Database is done here
connectDb();

//Cloudinary upload here
cloudinary.config({
  cloud_name: "viewhub",
  api_key: "253923537927214",
  api_secret: "OsKd3SLG1BzM3tR1tWGpQ3rzp_s",
});
//starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
