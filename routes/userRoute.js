const express = require("express");
const router = express.Router();
const { isLoggedIn, customeRole } = require("../middlewares/userData");

const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetail,
  updatePassword,
  changeUserDetails,
  adminAllUser,
  adminGetOneUserDetail,
  adminUpdateOneUserDetails,
  adminDeleteOneUser,
  managerAllUser,
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

// Admin only routes

router
  .route("/admin/users")
  .get(isLoggedIn, customeRole("admin"), adminAllUser);
router
  .route("/admin/user/:id")
  .get(isLoggedIn, customeRole("admin"), adminGetOneUserDetail)
  .put(isLoggedIn, customeRole("admin"), adminUpdateOneUserDetails)
  .delete(isLoggedIn, customeRole("admin"), adminDeleteOneUser);
// manager only routes
router
  .route("/manager/users")
  .get(isLoggedIn, customeRole("manager"), managerAllUser);

//exporting the router
module.exports = router;
