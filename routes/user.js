const express = require("express");
const userController = require("../controllers/user");
const userValidator = require("../validator/user")
const auth = require("../validator/auth")
const otpController = require("../controllers/otp");
const otpValidator = require("../validator/otp")

const router = express.Router();

// CRUD
router.post("/", userValidator.createUserValidator, userController.createUser);
router.get("/", auth.verifyToken, userController.getUsers);
router.get("/:id", userController.getUser);
router.patch("/:id", [auth.verifyToken, userValidator.updateUserValidator], userController.updateUser);
router.delete("/:id", auth.verifyToken, userController.deleteUser);

// Login
router.post("/login", userValidator.loginValidator, userController.loginUser);

// Verify Email
router.post("/send", otpValidator.sendValidator, otpController.emailOtp);
router.post("/verify", otpValidator.verifyValidator, otpController.verifyAccount);

// Change Password
router.post("/password/otp", otpValidator.sendValidator, otpController.forgotPasswordOtp);
router.post("/password/change", otpValidator.changePasswordValidator, otpController.changePassword);

module.exports = router;
