const express = require("express");
const router = express.Router();
const { signup ,login,logout} = require("../controllers/userController");

//all the routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);


//exporting the router
module.exports = router;
