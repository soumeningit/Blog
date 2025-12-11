const express = require("express");
const router = express.Router();

const { verifyToken: isAuthenticated } = require("../middlewares/authMiddleware");
const { contactusController } = require("../controllers/feedbackController");

router.post("/contact-us", isAuthenticated, contactusController);

module.exports = router;