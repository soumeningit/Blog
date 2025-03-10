const express = require('express');
const router = express.Router();

const { auth } = require('../Middleware/AuthMiddleware');
const { getBookMarkedItems, updateImage, updateProfile, updateUserSocialLinks } = require('../Controller/Profile');

router.get('/get-bookmarked-items', auth, getBookMarkedItems);
router.post('/update-image', auth, updateImage);
router.post('/update-profile', auth, updateProfile);
router.post('/update-social-links', auth, updateUserSocialLinks);

module.exports = router;