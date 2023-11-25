const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/userController");

//all the routes
router.post("/signup", signup);

//exporting the router
module.exports = router;
