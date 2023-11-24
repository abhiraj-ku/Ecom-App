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
    select: false,
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
    secured_url: {
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
  this.password = await bcrypt.hash(this.paasword, 10);
});

//validate the given password
userSchema.methods.isPassCorrect = async function (userPass) {
  return await bcrypt.compare(this.password, userPass);
};

//generating the jwt tokens using methods only
userSchema.methods.getJwtTokens = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generate forgot password token
//approach 1 .  function makeid(length) {
//   let result = "";
//   let characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*()";
//   let charLegth = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charLegth));
//   }
//   return result;
// }

//by using the crypto package built in the node itself
userSchema.methods.getforgotPassToken = function () {
  const forgotToken = crypto.randomBytes(20).toString("hex");

  //getting a hash of forgotToken and then storing in ther db
  this.forgotPasstoken = crypto
    .createHash("sha56")
    .update(forgotToken)
    .digest("hex");
  //time of hash token
  this.forgotPassExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};
//exporting the model
module.exports = mongoose.model("User", userSchema);
