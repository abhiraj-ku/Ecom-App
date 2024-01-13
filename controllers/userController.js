const User = require("../models/user.model.js");
const BigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken.js");
const Cloudinary = require("cloudinary");
const CustomError = require("../utils/customError");
const sendEmail = require("../utils/emailHelper.js");

//exporting the controllers

//Signup controller
module.exports.signup = BigPromise(async (req, res, next) => {
  //check if file is there or not
  // let result;
  if (!req.files || !req.files.photo) {
    return next(res.status(400).send("Image is required!"));
  }

  //from body we get required fields to verify
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).send("Name, password, and email are required");
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

//login controller
module.exports.login = BigPromise(async (req, res, next) => {
  //user will provide us the login details
  const { email, password } = req.body;
  //check for presence of the email & password
  if (!email || !password) {
    return next(
      new CustomError("please provide valid email and password", 400)
    );
  }
  //if present get the details from db
  try {
    const foundUser = await User.findOne({ email }).select("+password");
    if (!foundUser) {
      return next(new CustomError("Email not found!", 400));
    }
    //for checking password
    const isPasswordCorrect = await foundUser.isPassCorrect(password);
    if (!isPasswordCorrect) {
      return next(new CustomError("Incorrect password", 400));
    }
    cookieToken(foundUser, res);
  } catch (error) {
    console.log("Login Error :", error);
    return next(new CustomError("Internal Server Error", 500));
  }
});

module.exports.logout = BigPromise(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).end();
  } catch (err) {
    console.log("Logout error:", err);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//forgot password controller
module.exports.forgotPassword = BigPromise(async (req, res, next) => {
  //getting the mail first
  const { email } = req.body;
  const getUser = await User.findOne({ email });
  if (!getUser) {
    return next(new CustomError("Email not registerd", 500));
  }
  const forgotToken = getUser.getforgotPassToken();
  //we are doing this because we do not want to save th user according to specified model in mongoose model(kam chalau h)
  await getUser.save({ validateBeforeSave: false });

  //at this url we will send the mail
  const emailUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${forgotToken}`;

  const message = `Copy this link to get reset option\n\n<a href="${emailUrl}">link</a>`;

  const emailObject = {
    mail: getUser.email,
    subject: "Ecom App - password reset link",
    message: message,
  };
  try {
    await sendEmail(emailObject);

    res.status(200).json({
      success: true,
      message: "Email sent sucessfuly",
    });
  } catch (error) {
    getUser.forgotPasstoken = undefined;
    getUser.forgotPassExpiry = undefined;
    await getUser.save({ validateBeforeSave: false });

    return next(new CustomError(error.message, 500));
  }
});

module.exports.passwordReset = BigPromise(async (req, res, next) => {});
