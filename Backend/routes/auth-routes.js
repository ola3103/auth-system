const express = require("express");
const router = express.Router();
const { register, signIn, logOut } = require("../controller/auth-controller");

router.post("/register", register);
router.post("/sign-in", signIn);
router.delete("/logout", logOut);

module.exports = router;
