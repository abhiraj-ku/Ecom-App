const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
} = require("../controllers/userController");

//all the routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);

//exporting the router
module.exports = router;
