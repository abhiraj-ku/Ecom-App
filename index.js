const app = require("./app");
const connectDb = require("./config/db");
require("dotenv").config();
// const mongoose = require("mongoose");

//connection with Database is done here
connectDb();

//starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
