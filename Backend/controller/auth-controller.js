const register = async (req, res) => {
  res.send("register");
};
const signIn = async (req, res) => {
  res.send("sign in");
};
const logOut = async (req, res) => {
  res.send("log out");
};

module.exports = { register, signIn, logOut };
