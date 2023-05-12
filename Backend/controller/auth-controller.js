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

  const origin = "http://localhost:9000";
  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    origin,
    verificationToken: user.verificationToken,
  });
  res.status(201).json({
    msg: " successful, please check your email to verify your account",
  });
};

const verifyEmail = async (req, res) => {
  console.log(req.body);
  const { tokenV: verificationToken, emailV: email } = req.body.data;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AuthenticationError("Verification failed");
  }
  if (user.verificationToken !== verificationToken) {
    throw new AuthenticationError("Verification failed");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();

  res.status(200).json({ msg: "email verification successful" });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }
  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    throw new AuthenticationError("Please provide a valid email or password");
  }

  res.send("sign in");
};
const logOut = async (req, res) => {
  res.send("log out");
};

module.exports = { register, signIn, logOut, verifyEmail };
