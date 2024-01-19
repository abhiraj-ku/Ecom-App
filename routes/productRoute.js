const express = require("express");
const router = express.Router();
const { testProduct } = require("../controllers/productController");
const { isLoggedIn, customeRole } = require("../middlewares/userData");

router.get("/testproduct", testProduct);

module.exports = router;
