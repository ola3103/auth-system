const express = require("express");
const router = express.Router();
const { register, signIn, logOut } = require("../controller/auth-controller");

module.exports = router;
