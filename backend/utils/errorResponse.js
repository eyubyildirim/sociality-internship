class ErrorResponse extends Error {
  constructor(message, statusCode, value = 0) {
    super(message);
    this.statusCode = statusCode;
    this.value = value;
  }
}

module.exports = ErrorResponse;
