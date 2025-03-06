const express = require('express');
const router = express.Router();

const {
    sendOTPController,
    signUpController,
    logInController,
    logOut,
    changePasswordController
} = require('../Controller/Auth');

const { resetPasswordToken, resetPassword } = require('../Controller/ForgetPassword');

router.post('/sendOTP', sendOTPController);
router.post('/signUp', signUpController);
router.post('/login', logInController);
router.get('/logout', logOut);
router.post('/changepassword', changePasswordController);
router.post('/createresetpasswordtoken', resetPasswordToken);
router.post('/resetpassword', resetPassword);

module.exports = router;