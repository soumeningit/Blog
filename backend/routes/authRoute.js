const express = require("express");
const router = express.Router();

const {
    sendOTPController,
    registerUserController,
    loginUserController,
    resetPasswordTokenController,
    resetPasswordController
} = require("../controllers/authController");

router.post("/send-otp", sendOTPController);
router.post("/register-user", registerUserController);
router.post("/login-user", loginUserController);
router.post("/reset-password-token", resetPasswordTokenController);
router.post("/reset-password", resetPasswordController);

module.exports = router;