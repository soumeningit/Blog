const { contactus } = require("../service/feedbackService");

async function contactusController(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const response = await contactus(userId, name, email, subject, message);
    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message,
            error: response.error
        });
    };
    return res.status(200).json({
        success: true,
        message: response.message
    });
};

module.exports = { contactusController };