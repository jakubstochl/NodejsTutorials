const logger = require('@lib/logger');

class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }

  const handle = (err, res) => {
    const { statusCode, message } = err;
    logger.winston.error('Central error log: ' + message);
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  };

  module.exports = {
    ErrorHandler,
    handle
  }