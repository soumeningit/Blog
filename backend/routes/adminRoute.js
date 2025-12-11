const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const {
    createCategoryController,
    createSubCategoryController,
    adminLoginController,
    adminProfileController,
    getPostsController,
    getUsersController,
    getUserDetailsByIdController
} = require('../controllers/adminController');

router.post('/create-category', verifyToken, isAdmin, createCategoryController);
router.post('/create-subcategory', verifyToken, isAdmin, createSubCategoryController);
router.post('/admin-login', adminLoginController);
router.get('/admin-profile', verifyToken, isAdmin, adminProfileController);
router.get('/admin-posts', verifyToken, isAdmin, getPostsController);
router.get('/admin-users', verifyToken, isAdmin, getUsersController);
router.get('/admin-user/:id', verifyToken, isAdmin, getUserDetailsByIdController);

module.exports = router;