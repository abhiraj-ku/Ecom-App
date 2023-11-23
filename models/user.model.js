const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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

//exporting the model
module.exports = mongoose.model("User", userSchema);
