const { getSummary } = require("../service/contentService");
const { askBot } = require("../service/llmService");

async function createSummeryController(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    console.log("Request Body:", req.body);

    const contentId = req.body.contentId;
    if (!contentId) {
        return res.status(400).json({
            success: false,
            message: "Content ID is required"
        });
    };

    const contentData = await getSummary(contentId);
    console.log("Content Data:", contentData);
    if (!contentData.success) {
        return res.status(404).json({
            success: false,
            message: contentData.message
        });
    }

    return res.status(200).json({
        success: true,
        message: "Summary generated successfully",
        summary: contentData.data
    });

};

async function askBotController(req, res) {
    const query = req.params.query;
    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Query parameter is required"
        });
    }

    const botResponse = await askBot(query);

    console.log("Bot Response:", botResponse);

    if (!botResponse.success) {
        return res.status(500).json({
            success: false,
            message: botResponse.message,
            error: botResponse.error
        });
    }
    return res.status(200).json({
        success: true,
        response: botResponse.answer
    });
}

module.exports = {
    createSummeryController,
    askBotController
};