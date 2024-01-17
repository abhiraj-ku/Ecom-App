const express = require("express");
const { isLoggedIn } = require("../middlewares/userData");
const router = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetail,
  updatePassword,
  changeUserDetails
} = require("../controllers/userController");

//all the routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/password/reset/:token", passwordReset);
router.route("/userDashBoard").get(isLoggedIn, getLoggedInUserDetail);
router.route("/password/update").post(isLoggedIn, updatePassword);
router.route("/userdashboard/update").post(isLoggedIn, changeUserDetails);


//exporting the router
module.exports = router;
