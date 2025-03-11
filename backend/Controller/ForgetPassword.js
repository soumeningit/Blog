const User = require('../DataBase/User');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailSender = require('../Utils/mailSender');
const { passwordReset } = require('../Utils/mail/templates/passwordReset');

exports.resetPasswordToken = async (req, res) => {
    try {
        console.log("INSIDE RESET PASSWORD TOKEN");
        console.log("REQ BODY : ", req.body);
        const { email } = req.body;
        // check if the email exists
        if (!email) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Please enter an email address."
                })
        }
        // user is present or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404)
                .json({
                    success: false,
                    message: "No user found with this email address."
                })
        }
        console.log("USER", user);
        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            { new: true }
        );
        console.log("DETAILS", updatedDetails);

        const url = process.env.NODE_ENV === "production"
            ?
            `${process.env.FRONTEND_PROD_URL}/update-password/${token}`
            :
            `${process.env.FRONTEND_LOCAL_URL}/update-password/${token}`

        await mailSender(
            email,
            "Password Reset",
            passwordReset(url)
        );
        // return the response
        return res.status(200)
            .json({
                success: true,
                message: "Password reset link send to your registered mail id"
            })
    } catch (error) {
        console.log("Problems occured sending mail, please try after some time")
        console.log(error)
        return res.status(500)
            .json({
                success: false,
                message: "Mail sending, failed"
            })
    }
}

// reset Password
exports.resetPassword = async (req, res) => {
    try {
        console.log("INSIDE RESET PASSWORD");
        console.log("REQ BODY : ", req.body);
        const { password, confirmPassword, token } = req.body;
        // validate
        console.log("inside reset-password in server ", "password : ", password, "confirmPassword : ", confirmPassword, " token : ", token)
        if (!password || !confirmPassword || !token) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Please fill all the details."
                })
        }
        // validate password
        if (password != confirmPassword) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Passwords are mismatched"
                })
        }
        // get userdetails
        const userDetails = await User.findOne({ token });
        // check user is present or not
        if (!userDetails) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Invalid token, User not found"
                })
        }
        console.log("USER DETAILS", userDetails);
        // token time check
        if (userDetails.tokenExpireTime < Date.now()) {
            return res.status(408)
                .json({
                    success: false,
                    message: "Token expired, please retry"
                });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // update into db
        const updatedUser = await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true })
        console.log("UPDATED USER", updatedUser);
        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: "Password reset failed!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })

    } catch (e) {
        console.log("Reset Password failed!, please try after some time")
        console.log(e)
        return res.status(400)
            .json({
                success: false,
                message: "Reset password process failed!"
            })
    }
}