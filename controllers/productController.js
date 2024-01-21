const Product = require("../models/product.model");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const uploadPhotosToCloudinary = require("../utils/uploadtoCloudinary");

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
