const mongoose = require("mongoose");

const password = encodeURIComponent(process.env.MOGODB_PASS.trim());
const connectionString = `mongodb+srv://arko:${password}@cluster0.i7ufc6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDb = () => {
  mongoose
    .connect(connectionString)
    .then(console.log(`DB connection successful`))
    .catch((error) => {
      console.log(`DB connection issue`);
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectDb;
