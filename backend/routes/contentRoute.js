const express = require('express');
const router = express.Router();

const {
    verifyToken,
    isAdmin,
    isAuthor,
    allowRolesForPostCreation,
    allowRoles
} = require('../middlewares/authMiddleware');

const {
    createBlogController,
    saveBlogController,
    createCommentController,
    likePostController,
    savePostController,
    followAuthorController,
    getPostsByAuthorController,
    getSubCategoriesController,
    editPostController,
    fileUploadController,
    upgradeRoleController
} = require('../controllers/contentController');

router.post('/create-blog', verifyToken, allowRolesForPostCreation, createBlogController);
router.post('/save-blog', verifyToken, allowRolesForPostCreation, saveBlogController);
router.post('/create-comment', verifyToken, allowRoles("user", "author", "admin"), createCommentController);
router.post('/like-post', verifyToken, allowRoles("user", "author", "admin"), likePostController);
router.post('/save-post', verifyToken, allowRoles("user", "author", "admin"), savePostController);
router.post('/follow-author', verifyToken, allowRoles("user", "author", "admin"), followAuthorController);
router.get('/posts-by-author', verifyToken, allowRoles("author", "admin"), getPostsByAuthorController);
router.get('/sub-categories', verifyToken, allowRoles("author", "admin"), getSubCategoriesController);
router.put('/edit-post/:id', verifyToken, allowRoles("author", "admin"), editPostController);
router.post('/upload-file', verifyToken, allowRoles("author", "admin"), fileUploadController);
router.put('/upgrade-role', verifyToken, upgradeRoleController);
module.exports = router;