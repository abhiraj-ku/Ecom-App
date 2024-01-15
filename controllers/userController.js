const User = require("../models/user.model.js");
const BigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken.js");
const Cloudinary = require("cloudinary");
const CustomError = require("../utils/customError");
const sendEmail = require("../utils/emailHelper.js");
const crypto = require("crypto");

//exporting the controllers

//Signup controller
module.exports.signup = BigPromise(async (req, res, next) => {
  try {
    // Checking if the User has uploaded an image
    if (!req.files || !req.files.photo) {
      return next(res.status(400).send("Image is required!"));
    }

    // Extracting user Information from request body
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !name || !password) {
      return res.status(400).send("Name, password, and email are required");
    }

    // Upload the user's image to Cloudinary
    let file = req.files.photo;
    const result = await Cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "Ecom",
      width: 150,
      crop: "scale",
    });

    // Create and store user details in database
    const user = await User.create({
      name,
      email,
      password,
      photo: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
    });

    //Generate an authentication token for the user
    cookieToken(user, res);

    // Send a success response
    res.status(200).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.error("Error creating User", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error !",
    });
  }

  //calling cookieToken method
});

// Login Controller
module.exports.login = BigPromise(async (req, res, next) => {
  try {
    // User provides login details
    const { email, password } = req.body;

    // Check for the presence of email & password
    if (!email || !password) {
      return next(
        new CustomError("Please provide valid email and password", 400)
      );
    }

    // Retrieve user details from the database
    const foundUser = await User.findOne({ email }).select("+password");

    // If user not found, return an error
    if (!foundUser) {
      return next(new CustomError("Email not found", 404));
    }

    // Check if the provided password is correct
    const isPasswordCorrect = await foundUser.isPassCorrect(password);

    // If password is incorrect, return an error
    if (!isPasswordCorrect) {
      return next(new CustomError("Incorrect password", 401));
    }

    // Generate and set an authentication token for the user
    cookieToken(foundUser, res);

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        // Include any relevant user details in the response
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        // ... other user details ...
      },
    });
  } catch (error) {
    // Handle errors
    console.error("Login Error:", error);

    // Send an error response
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
// Logout Controller
module.exports.logout = BigPromise(async (req, res, next) => {
  try {
    // Clear the authentication token cookie
    res.cookie("token", null, {
      expires: new Date(0), // Set expiration to a past date to immediately expire the cookie
      httpOnly: true,
    });

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    // Handle errors
    console.error("Logout Error:", error);

    // Send an error response
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Forgot Password Controller
module.exports.forgotPassword = BigPromise(async (req, res, next) => {
  try {
    // Get the email from the request body
    const { email } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return next(new CustomError("Email not registered", 404));
    }

    // Generate the forgot password token
    const forgotToken = user.getforgotPassToken();

    // Temporarily disable mongoose validation before saving the user
    await user.save({ validateBeforeSave: false });

    // Build the reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${forgotToken}`;

    // Compose the email message
    const message = `Copy this link to reset your password:\n\n${resetPasswordUrl}`;

    // Create an email object
    const emailObject = {
      mail: user.email,
      subject: "Ecom App - Password Reset Link",
      message: message,
    };

    // Send the reset password email
    await sendEmail(emailObject);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    // Handle errors
    console.error("Forgot Password Error:", error);

    // Rollback changes if there's an error during email sending
    user.forgotPasstoken = undefined;
    user.forgotPassExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new CustomError("Internal Server Error", 500));
  }
});

// Password reset controller
module.exports.passwordReset = BigPromise(async (req, res, next) => {
  try {
    // Extracting the token from request parameter
    const token = req.params.token;

    // Creating a hash of the token using SHA-256
    const encryptToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Finding the user with provided token and ensuring the token has not expired
    const findUser = await User.findOne({
      forgotPasstoken: encryptToken,
      forgotPassExpiry: { $gt: Date.now() },
    });

    // Handling the case when no user is found for provided token
    if (!findUser) {
      return next(new CustomError("Token is invalid or expired", 400));
    }

    // Cheking if the password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(404).send({
        success: false,
        message: "password and confirm password does not match!",
      });
    }

    // Updating the user's password , clearing reset token , and saving the changes
    findUser.password = req.body.password;
    findUser.forgotPasstoken = undefined;
    findUser.forgotPassExpiry = undefined;
    await findUser.save();

    // Generating and setting a new authentication token for the user
    cookieToken(findUser, res);

    // Sending a success message
    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (error) {
    // Handling any unexpected errors
    console.error("Password Reset Error:", error);
    return next(new CustomError("Internal server Error", 500));
  }
});

// User details controller
module.exports.getLoggedInUserDetail = BigPromise(async (req, res, next) => {
  // Extracting the user details from his/her id
  const user = await User.findById(req.user.id);

  //handling when no user is find
  if (!user) {
    return next(new CustomError("User Not found", 401));
  }

  // Sending success message
  res.status(200).json({
    success: true,
    user,
  });
});
