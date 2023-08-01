const express = require("express");
const router = express.Router();
const {
  register,
  signIn,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controller/auth-controller");
const authenticationMiddleware = require("../middleware/authentication-middleware");

router.post("/register", register);
router.post("/sign-in", signIn);
router.delete("/logout", authenticationMiddleware, logOut);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
