const notFoundMiddleware = async (req, res) =>
  res.status(404).json({ msg: "This route cannot be found" });

module.exports = notFoundMiddleware;
