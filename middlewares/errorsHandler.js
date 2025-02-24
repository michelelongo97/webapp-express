const errorsHandler = (err, req, res, next) => {
  return res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
};

module.exports = errorsHandler;
