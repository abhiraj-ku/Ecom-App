const app = require("./app");
const connectDb = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary");
// const mongoose = require("mongoose");

//connection with Database is done here
connectDb();

//Cloudinary upload here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
          