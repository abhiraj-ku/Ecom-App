const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(console.log(`DB connection successful`))
    .catch((error) => {
      console.log(`DB connection issue`);
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectDb;
