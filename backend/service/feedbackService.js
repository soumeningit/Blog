const Feedback = require("../database/Feedback");
const User = require("../database/User")

async function contactus(userId, name, email, subject, message) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found",
                status: 404
            }
        };

        const response = await Feedback.create({
            userId: user._id,
            comment: message,
            type: "contact",
            email: email,
            subject: subject,
            username: name
        });
        return {
            success: true,
            status: 200,
            message: "Contact us form submitted successfully"
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: "Failed to submit contact us form",
            error: error.message
        }
    }
}

module.exports = { contactus };