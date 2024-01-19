const BigPromise = require("../middlewares/bigPromise");

module.exports.testProduct = BigPromise((req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from product backend",
  });
});
