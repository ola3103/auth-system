const BadRequestError = require("../errors/badRequest-error");
const User = require("../model/user");
const Token = require("../model/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const AuthenticationError = require("../errors/authentication-error");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const { attachCookiesToResponse } = require("../utils/jwt-setup");
const sendResetPasswordLink = require("../utils/sendResetPasswordLink");
const hashString = require("../utils/hashString");

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

  if (!user.isVerified) {
    throw new AuthenticationError("Please verify your email address");
  }

  const tokenUser = {
    name: user.name,
    email: user.email,
    userId: user._id,
  };
  let refreshToken = "";

  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new AuthenticationError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(200).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, userAgent, ip, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(200).json({ user: tokenUser });
};
const logOut = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.send("log out");
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Kindly provide a email");
  }
  const user = await User.findOne({ email });
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    const origin = "http://localhost:9000";
    sendResetPasswordLink({
      name: user.name,
      token: passwordToken,
      origin,
      email: user.email,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpireDate = new Date(Date.now() + tenMinutes);

    user.passwordTokenExpireDate = passwordTokenExpireDate;
    user.passwordToken = passwordToken;

    await user.save();
  }
  res.status(200).json({ msg: "check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  console.log(req.body);
  const { email, token, password } = req.body;
  if (!email || !token || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });
  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === token &&
      user.passwordTokenExpireDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpireDate = null;

      user.save();
    }
  }

  res.status(200).json({ msg: "Password reset successful" });
};

module.exports = {
  register,
  signIn,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
