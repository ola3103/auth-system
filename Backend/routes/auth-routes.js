const express = require("express");
const router = express.Router();
const {
  register,
  signIn,
  logOut,
  verifyEmail,
} = require("../controller/auth-controller");

router.post("/register", register);
router.post("/sign-in", signIn);
router.delete("/logout", logOut);
router.post("/verify-email", verifyEmail);

module.exports = router;
