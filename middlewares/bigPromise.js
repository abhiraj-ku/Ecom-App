//try -catch & ansync -await || promises

module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
