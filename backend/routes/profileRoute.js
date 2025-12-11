const express = require('express');
const router = express.Router();

const {
    getUserProfileController,
    updateUserPasswordController,
    updateProfilePicController,
    updateUserProfileController,
    getSavedPostsController,
    toggleSaveController,
    searchSavedPostsController
} = require('../controllers/profileController');

const {
    verifyToken: isAuthenticated
} = require('../middlewares/authMiddleware');

router.get('/user-profile-details', isAuthenticated, getUserProfileController);
router.put('/update-password', isAuthenticated, updateUserPasswordController);
router.put('/update-profile-pic', isAuthenticated, updateProfilePicController);
router.put('/update-user-profile', isAuthenticated, updateUserProfileController);
router.get('/get-saved-posts', isAuthenticated, getSavedPostsController);
router.post('/toggle-save-post', isAuthenticated, toggleSaveController);
router.get('/search-saved-posts', isAuthenticated, searchSavedPostsController);

module.exports = router;