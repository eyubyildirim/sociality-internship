const ErrorResponse = require("../utils/errorResponse");
const { CastError } = require("mongoose");

const errorHandler = (err, req, res, next) => {
  let error = null;
  let errors = [];

  // Log console for dev
  console.log(err);

  if (err.errors) {
    errors = err.errors;
  }

  // Invalid ObjectId
  if (err instanceof CastError) {
    error = new ErrorResponse(`${err.value} is not a valid ObjectId`);
  }

  // Product is already in the database
  if (err.code) {
    if (err.code === 11000) {
      error = new ErrorResponse(
        `This product is already in the database: ${err.keyValue.name}`,
        400
      );
    }
  }

  if (!error) {
    error = { statusCode: err.statusCode, message: err.message };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
