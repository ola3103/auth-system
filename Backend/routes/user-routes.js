const express = require("express");
const {
  dashboard,
  updateUser,
  updateUserPassword,
} = require("../controller/user-controller");
const authenticationMiddleware = require("../middleware/authentication-middleware");
const router = express.Router();

router.get("/dashboard", authenticationMiddleware, dashboard);
router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);

module.exports = router;
