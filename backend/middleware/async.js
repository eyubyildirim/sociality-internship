// This middleware resolves our promises made in controller and
// if any error is caught it passes to errorHandling middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
