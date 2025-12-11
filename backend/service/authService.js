const otpGenerator = require('otp-generator');
const Token = require('../database/Token');
const User = require('../database/User');
const bcrypt = require('bcrypt');
const { generateResetToken } = require('../utils/generateToken');
const { isUserExist } = require('../utils/common');
const jwt = require('jsonwebtoken');
const loadTemplate = require('../utils/emailTemplate');
const mailSender = require('../utils/mailSender');
const UserProfile = require('../database/UserProfile');
const generateUsername = require('../utils/generateUsername');

async function sendOTP(name, email) {
    try {
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        const otpData = new Token({
            email: email,
            token: otp,
            tokenType: 'otp'
        });

        const savedResponse = await otpData.save();

        console.log("Saved OTP Data:", savedResponse);

        // here send OTP via email
        const htmlBody = loadTemplate("OTP.html", {
            appName: process.env.APP_NAME,
            username: name,
            otp: otp,
            supportEmail: process.env.SUPPORT_EMAIL,
            year: new Date().getFullYear()
        });

        // Send OTP Email
        await mailSender(process.env.APP_NAME, email, otp, htmlBody);

        return {
            success: true,
            status: 200,
            message: "OTP sent successfully",
            data: { otp: otp }
        };

    } catch (error) {
        console.error("Error in sendOTP:", error);
        return {
            status: 500,
            success: false,
            message: "Failed to send OTP",
            error: error.message,
            data: null
        }
    }
}

async function registerUser(name, email, password, otp, role) {
    try {
        const userData = await User.findOne({ email: email });
        if (userData) {
            return {
                success: false,
                status: 400,
                message: "User already exists",
                data: null
            }
        }

        const otpData = await Token.findOne({ email: email, tokenType: 'otp' }).sort({ createdAt: -1 });

        console.log("OTP Data from DB:", otpData);

        if (!otpData) {
            return {
                success: false,
                status: 400,
                message: "OTP not found, please request a new one",
                data: null
            }
        }

        if (otpData.token !== otp) {
            return {
                success: false,
                status: 400,
                message: "Invalid OTP",
                data: null
            }
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });

        const savedResponse = await newUser.save();

        let userName = generateUsername(name);

        // need to check username uniqueness
        const isUsernameExist = await UserProfile.findOne({ userName: userName });
        if (isUsernameExist) {
            const generatedId = uuidv4().split('-')[0];
            userName = `${userName}${generatedId}`;
        }

        const profilesDetails = await UserProfile.create({
            userId: savedResponse._id,
            userName: userName
        });

        savedResponse.userProfile = profilesDetails._id;
        await savedResponse.save();

        return {
            success: true,
            status: 200,
            message: "User registered successfully",
            data: savedResponse._id
        };

    } catch (error) {
        console.error("Error in registerUSer:", error);
        return {
            success: false,
            status: 500,
            message: "Registration failed",
            error: error.message,
            data: null
        }
    }
}

async function loginUser(email, password) {
    try {
        const userData = await User.findOne({ email: email });
        if (!userData) {
            return {
                success: false,
                status: 400,
                message: "User does not exist",
                data: null
            }
        }

        const profileData = await UserProfile.findOne({ userId: userData._id });

        const isPasswordValid = bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return {
                success: false,
                status: 400,
                message: "Invalid password",
                data: null
            }
        }

        const payload = { id: userData._id, email: userData.email, name: userData.name, role: userData.role };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            success: true,
            status: 200,
            message: "Login successful",
            data: { user: payload, token: token, profile: profileData }
        };
    } catch (error) {
        console.error("Error in loginUser:", error);
        return {
            success: false,
            status: 500,
            message: "Login failed",
            error: error.message,
            data: null
        }
    }
}

async function resetPasswordToken(email) {
    try {
        const userData = await isUserExist(email);
        if (!userData.success) {
            return {
                success: false,
                status: 400,
                message: "User does not exist",
                data: null
            }
        }
        console.log("User Data for reset token:", userData);
        const user = userData.data;

        if (!user) {
            return {
                success: false,
                status: 400,
                message: "User does not exist",
                data: null
            }
        }

        if (user.isOAuthUser) {
            return {
                success: false,
                status: 400,
                message: "Password reset is not available for OAuth users",
                data: null
            }
        }

        const resetToken = generateResetToken();
        const tokenData = new Token({
            email: user.email,
            token: resetToken,
            tokenType: 'reset'
        });
        const savedToken = await tokenData.save();
        console.log("Saved Reset Token Data:", savedToken);

        const baseURL = process.env.FRONTEND_URL;

        const url = baseURL + "/auth/update-password/" + resetToken;

        console.log("Password Reset URL:", url);

        // need to send this token via email to the user
        const htmlBody = loadTemplate("ResetPassword.html", {
            appName: process.env.APP_NAME,
            username: user.name,
            resetUrl: url,
            supportEmail: process.env.SUPPORT_EMAIL,
            year: new Date().getFullYear()
        });

        const mailData = await mailSender(process.env.APP_NAME, user.email, "Reset Your Password", htmlBody);

        console.log("Mail Data:", mailData);

        if (!mailData.accepted || mailData.accepted.length === 0) {
            return {
                success: false,
                status: 500,
                message: "Failed to send reset email",
                data: null
            }
        }

        return {
            success: true,
            status: 200,
            message: "Password reset token generated successfully",
            data: { url }
        };
    } catch (error) {
        console.error("Error in resetPasswordToken:", error);
        return {
            success: false,
            status: 500,
            message: "Failed to generate reset token",
            error: error.message,
            data: null
        }
    }

}

async function resetPassword(token, password) {
    try {
        const tokenData = await Token.findOne({ token: token, tokenType: 'reset' }).sort({ createdAt: -1 })
        console.log("Token Data for resetPassword:", tokenData);

        if (!tokenData) {
            return {
                success: false,
                status: 400,
                message: "Token not exist or expired",
                data: null
            }
        }

        if (tokenData.token !== token) {
            return {
                success: false,
                status: 400,
                message: "Token not exist or mismatched token",
                data: null
            }
        }

        const userEmail = tokenData.email;

        const userData = await isUserExist(userEmail);
        if (!userData.success) {
            return {
                success: false,
                status: 400,
                message: "User does not exist",
                data: null
            }
        }

        console.log("User Data for resetPassword:", userData);

        const hashPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            userData.data._id,
            { password: hashPassword },
            { new: true }
        );

        console.log("Updated User Data after resetPassword:", updatedUser);
        return {
            success: true,
            status: 200,
            message: "Password reset successfully",
            data: updatedUser
        };
    } catch (error) {
        console.error("Error in resetPassword:", error);
        return {
            success: false,
            status: 500,
            message: "Failed to reset password",
            error: error.message,
            data: null
        }
    }
}

module.exports = {
    sendOTP,
    registerUser,
    loginUser,
    resetPasswordToken,
    resetPassword
}