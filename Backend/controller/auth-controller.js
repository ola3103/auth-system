const BadRequestError = require("../errors/badRequest-error");
const User = require("../model/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const AuthenticationError = require("../errors/authentication-error");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

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

  const origin = "localhost:9000";
  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    origin,
    verificationToken: user.verificationToken,
  });
  res
    .status(201)
    .json({
      msg: " successful, please check your email to verify your account",
    });
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;

  if (!email || !verificationToken) {
    throw new AuthenticationError("Invalid Credentials");
  }
};

const signIn = async (req, res) => {
  res.send("sign in");
};
const logOut = async (req, res) => {
  res.send("log out");
};

module.exports = { register, signIn, logOut, verifyEmail };
