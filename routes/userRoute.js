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
  updatePassword
} = require("../controllers/userController");

//all the routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/password/reset/:token", passwordReset);
router.route("/userDashBoard").get(isLoggedIn, getLoggedInUserDetail);
router.route("/password/update").post(isLoggedIn, updatePassword);


//exporting the router
module.exports = router;
