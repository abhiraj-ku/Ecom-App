const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [40, "Name should not be more than 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
    validate: [validator.isEmail, "Please provide correct email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password should be greater than 6 characters"],
  },
  role: {
    type: String,
    dafault: "user",
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  forgotPasstoken: String,
  forgotPassExpiry: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encypting the password before saving it  using lifecycle hooks of mongoose and bcrypt library
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//validate the given password
userSchema.methods.isPassCorrect = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

//generating the jwt tokens using methods only
userSchema.methods.getJwtTokens = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//by using the crypto package built in the node itself
userSchema.methods.getforgotPassToken = function () {
  const forgotToken = crypto.randomBytes(20).toString("hex");

  //getting a hash of forgotToken and then storing in ther db
  this.forgotPasstoken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");
  //time of hash token
  this.forgotPassExpiry = Date.now() + 20 * 60 * 1000;

  console.log(this.forgotPasstoken);
  return forgotToken;
};
//exporting the model
module.exports = mongoose.model("User", userSchema);
