const express = require("express");
const {
  dashboard,
  updateUser,
  updateUserPassword,
} = require("../controller/user-controller");
const authenticationMiddleware = require("../middleware/authentication-middleware");
const router = express.Router();

router.get("/", authenticationMiddleware, dashboard);
router.patch("/user/updateUser", updateUser);
router.patch("user/updateUserPassword", updateUserPassword);

module.exports = router;
