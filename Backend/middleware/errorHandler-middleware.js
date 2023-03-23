const errorHandlerMiddleware = async (err, req, res, next) => {
  const customErrorMessage = {
    msg: err.message || "Something just went wrong please try again later",
    statusCode: err.statusCode || 500,
  };

  res
    .status(customErrorMessage.statusCode)
    .json({ msg: customErrorMessage.msg });
};

module.exports = errorHandlerMiddleware;
