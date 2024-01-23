const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
} = require("../controllers/productController");
const { isLoggedIn, customeRole } = require("../middlewares/userData");

// User specific routes
router.route("/products").get(getAllProducts);

// Admin products
router
  .route("/admin/product/add")
  .post(isLoggedIn, customeRole("admin"), addProduct);

module.exports = router;
