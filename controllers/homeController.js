exports.home = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello from backend",
  });
};
exports.homeDummy = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello from dummy app",
  });
};
