const {
    sendOTP,
    registerUser,
    loginUser,
    resetPasswordToken,
    resetPassword
} = require("../service/authService");

async function sendOTPController(req, res) {
    console.log("Request Body:", req.body);
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    const response = await sendOTP(name, email);

    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message,
            error: response.error || null
        });
    }

    return res.status(response.status).json({
        success: true,
        message: response.message,
        data: response.data || null
    });

}

async function registerUserController(req, res) {

    console.log("Request Body:", req.body);

    const { name, email, password, otp, role } = req.body;

    if (!name || !email || !password || !otp) {
        return res.status(400).json({
            success: false,
            message: "Name, email, password and OTP are required"
        });
    }

    const response = await registerUser(name, email, password, otp, role);

    console.log("Register User Response:", response);

    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message,
            error: response.error || null
        });
    }

    return res.status(response.status).json({
        success: true,
        message: response.message,
        data: response.data || null
    });
}

async function loginUserController(req, res) {

    console.log("Request Body:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    const response = await loginUser(email, password);
    console.log("Login response : " + response);
    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message,
            error: response.error || null
        });
    }
    return res.status(response.status).json({
        success: true,
        message: response.message,
        data: response.data || null
    });
}

async function resetPasswordTokenController(req, res) {
    const { email } = req.body;
    console.log("Request Body:", req.body);
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    const response = await resetPasswordToken(email);
    console.log("Reset Password Token Response:", response);

    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message,
            error: response.error || null
        });
    }
    return res.status(response.status).json({
        success: true,
        message: response.message,
        data: response.data || null
    });
}

async function resetPasswordController(req, res) {
    console.log("Request Body for resetPasswordController:", req.body);
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Token and new password are required"
        });
    }

    const response = await resetPassword(token, newPassword);

    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message,
            error: response.error || null
        });
    }
    return res.status(response.status).json({
        success: true,
        message: response.message,
        data: response.data || null
    });
}

module.exports = {
    sendOTPController,
    registerUserController,
    loginUserController,
    resetPasswordTokenController,
    resetPasswordController
};