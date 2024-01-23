const express = require("express");
const router = express.Router();
const { testProduct } = require("../controllers/productController");
const { isLoggedIn, customeRole } = require("../middlewares/userData");

router.route("/testproduct").get(testProduct);

module.exports = router;
