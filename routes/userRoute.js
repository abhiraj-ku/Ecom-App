const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/userController");

//all the routes
router.route("/signup").post(signup);

//exporting the router
module.exports = router;
