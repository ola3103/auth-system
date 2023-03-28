const BadRequestError = require("../errors/badRequest-error");
const User = require("../model/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields");
  }
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new BadRequestError("This email already exist");
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({ name, email, password, verificationToken });
  sendEmail({
    to: user.email,
    subject: "Email Verification",
    html: `<h1> Hello ${user.name} </h1>`,
  });
  res.send("register");
};
const signIn = async (req, res) => {
  res.send("sign in");
};
const logOut = async (req, res) => {
  res.send("log out");
};

module.exports = { register, signIn, logOut };
