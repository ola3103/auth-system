const dashboard = async (req, res) => {
  res.status(200).json({ user: req.user });
};
const updateUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};
const updateUserPassword = async (req, res) => {
  res.status(200).json({ msg: "update user password" });
};
module.exports = { dashboard, updateUser, updateUserPassword };
