const User = require("../models/user.model.js");
const BigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");

//exporting the controllers
module.exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  //check for email
  if (!email || !name || !password) {
    return next(new Error("Name ,password and email are required"));
  }

  //creating the user and connecting to mongoDb
  const user = await User.create({
    name,
    email,
    password,
  });
});
