const express = require('express');
const router = express.Router();

const { auth } = require('../Middleware/AuthMiddleware');
const { addComment, addReply } = require('../Controller/CommentController');

router.post('/addComment', auth, addComment);
router.post('/addReply', auth, addReply);

module.exports = router;