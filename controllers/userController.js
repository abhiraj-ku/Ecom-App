const User = require("../models/user.model.js");
const BigPromise = require("../middlewares/bigPromise");
// const customError = require("../utils/customError");
const fileUpload = require("express-fileupload");
const cookieToken = require("../utils/cookieToken.js");
const Cloudinary = require("cloudinary");

//exporting the controllers
module.exports.signup = BigPromise(async (req, res, next) => {
  //check if file is there or not
  // let result;
  if (!req.files) {
    return next(res.send("Image is required !"))
  }


  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return new Error("Name ,password and email are required");
  }
  let file = req.files.photo;
    const result = await Cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "Ecom",
      width: 150,
      crop: "scale",
    });
  
  //check for email
  //creating the user and connecting to mongoDb
  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });


  //calling cookieToken method
  cookieToken(user, res);
});
