const User = require("../models/user.model.js");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

// Middleware to check if user is logged in
module.exports.isLoggedIn = BigPromise(async (req, res, next) => {
  try {
    // Getting the authorization token from cookies or headers
    const token =
      req.cookies.token ||
      (req.headers.authorization || "").replace("Bearer ", "");

    // Verify if token is present
    if (!token) {
      throw new CustomError("Login first to access", 401);
    }

    // Verify the JWT token from request cookie
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user from decoded user id
    req.user = await User.findById(decodedToken.id);

    // Forward to the next middleware
    return next();
  } catch (error) {
    // Handle errors gracefully
    return next(error);
  }
});

// Middlerware to check the role of user
module.exports.customeRole = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !roles.includes(req.user.role)) {
        throw new CustomError(
          "You are not allowed to access this resource!",
          403
        );
      }

      console.log("User Role:", req.user.role);
      next();
    } catch (error) {
      next(error);
    }
  };
};
