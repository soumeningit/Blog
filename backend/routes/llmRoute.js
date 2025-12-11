const express = require("express");
const router = express.Router();

const { verifyToken: isAuthenticated } = require("../middlewares/authMiddleware")
const {
    createSummeryController,
    askBotController
} = require("../controllers/llmController");

router.post("/generate-summary", isAuthenticated, createSummeryController);
router.get("/ask-bot/:query", askBotController);

module.exports = router;