const Product = require("../models/product.model");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const uploadPhotosToCloudinary = require("../utils/uploadtoCloudinary");
const productModel = require("../models/product.model");
const WhereClause = require("../utils/whereClause");

// test controller
module.exports.testProduct = BigPromise(async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "hello lawde",
  });
});

// Adding a product
module.exports.addProduct = BigPromise(async (req, res, next) => {
  try {
    if (!req.files || !req.files.photos) {
      throw new CustomError("Images are required!", 401);
    }

    const uploadedImages = await uploadPhotosToCloudinary(req.files.photos);

    req.body.photos = uploadedImages;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
});

// Get product(s)
module.exports.getAllProducts = BigPromise(async (req, res, next) => {
  try {
    // Constants
    const resultPerPage = 5;

    // Get total number of products
    const totalProducts = await productModel.countDocuments();

    // Create a WhereClause object with the base query
    const prodObj = new WhereClause(productModel.find(), req.query);

    // Apply search and filter
    prodObj.search().filter();

    // Get the products without pagination for counting
    let products = await prodObj.collection;
    const filteredProductLength = products.length;

    // Apply pagination
    prodObj.pager(resultPerPage);
    products = await prodObj.collection;

    // Send the response
    res.status(200).json({
      success: true,
      products,
      filteredProductLength,
      totalProducts,
      resultPerPage,
    });
  } catch (error) {
    // Handle errors
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
