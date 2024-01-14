const BigPromise = require("../middlewares/bigPromise");

exports.home = BigPromise((req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from backend",
  });
});

exports.homeDummy = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Hello from dummy app",
    });
  } catch (error) {
    console.log(error);
  }
};
