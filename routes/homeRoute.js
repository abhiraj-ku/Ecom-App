const express = require("express");
const router = express.Router();
const { home, homeDummy } = require("../controllers/homeController");

//router
router.route("/").get(home);
router.route("/dummy").get(homeDummy);

//exporting the route
module.exports = router;
