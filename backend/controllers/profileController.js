const { getUserProfile, updateUserPassword, updateProfilePic, updateUserProfile, getSavedPosts, handleToggleSave, searchSavedPosts } = require("../service/profileService");

async function getUserProfileController(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized: User ID not found"
        });
    }
    const profileResult = await getUserProfile(userId);
    if (!profileResult.success) {
        return res.status(500).json({
            success: false,
            message: profileResult.message,
            error: profileResult.error || null
        });
    }
    return res.status(200).json({
        success: true,
        message: profileResult.message,
        data: profileResult.data
    });
};

async function updateUserPasswordController(req, res) {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized: User ID not found"
        });
    }
    const updateResult = await updateUserPassword(userId, oldPassword, newPassword);
    if (!updateResult.success) {
        return res.status(400).json({
            success: false,
            message: updateResult.message
        });
    }
    return res.status(200).json({
        success: true,
        message: updateResult.message
    });
};

async function updateProfilePicController(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized: User ID not found"
        });
    }

    const image = req.files.image;
    if (!image) {
        return res.status(400).json({
            success: false,
            message: "No image file uploaded"
        });
    }

    const response = await updateProfilePic(userId, image);
    if (!response.success) {
        return res.status(500).json({
            success: false,
            message: response.message,
            error: response.error || null
        });
    }

    return res.status(200).json({
        success: true,
        message: response.message,
        data: response.data
    });

};

async function updateUserProfileController(req, res) {
    const userId = req.user.id;
    console.log("Update Profile Request Body:", req.body);
    const data = req.body;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized: User ID not found"
        });
    }

    if (String(data.id) !== String(userId)) {
        return res.status(403).json({
            success: false,
            message: "Forbidden: You can only update your own profile"
        });
    }

    const updateResult = await updateUserProfile(userId, data);
    if (!updateResult.success) {
        return res.status(400).json({
            success: false,
            message: updateResult.message
        });
    }
    return res.status(200).json({
        success: true,
        message: updateResult.message
    });
};

async function getSavedPostsController(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized: User ID not found"
        });
    }
    const { page, limit } = req.query;
    const savedPostsResult = await getSavedPosts(userId, page, limit);
    if (!savedPostsResult.success) {
        return res.status(500).json({
            success: false,
            message: savedPostsResult.message,
            error: savedPostsResult.error || null
        });
    }
    return res.status(200).json({
        success: true,
        message: savedPostsResult.message,
        data: savedPostsResult.data
    });
};

async function toggleSaveController(req, res) {
    const userId = req.user.id;
    const { postId } = req.body;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized: User ID not found"
        });
    }
    const toggleSaveResult = await handleToggleSave(userId, postId);
    if (!toggleSaveResult.success) {
        return res.status(500).json({
            success: false,
            message: toggleSaveResult.message,
            error: toggleSaveResult.error || null
        });
    }
    return res.status(200).json({
        success: true,
        message: toggleSaveResult.message
    });
};

async function searchSavedPostsController(req, res) {
    const userId = req.user.id;
    const { query, page, limit } = req.query;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized: User ID not found"
        });
    };

    const searchResult = await searchSavedPosts(userId, query, page, limit);
    if (!searchResult.success) {
        return res.status(500).json({
            success: false,
            message: searchResult.message,
            error: searchResult.error || null
        });
    }
    return res.status(200).json({
        success: true,
        message: searchResult.message,
        data: searchResult.data
    });
}

module.exports = {
    getUserProfileController,
    updateUserPasswordController,
    updateProfilePicController,
    updateUserProfileController,
    getSavedPostsController,
    toggleSaveController,
    searchSavedPostsController
};