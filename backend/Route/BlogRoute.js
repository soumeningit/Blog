const express = require('express');
const router = express.Router();

const { auth, isAuthor } = require('../Middleware/AuthMiddleware');
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    getBlogByUserId,
    addLike,
    removeLike,
    addBookMark,
    removeBookMark,
    thumbnailUpload,
    deleteBlog,
    getGetBlogsByCategory,
    editBlog
} = require('../Controller/Blog');

router.post('/create-blog', auth, isAuthor, createBlog);
router.get('/get-blogs', getAllBlogs);
router.get('/get-blog-by-id', getBlogById);
router.get('/get-blog-by-user-id', auth, isAuthor, getBlogByUserId);
router.post('/add-like', auth, addLike);
router.post('/remove-like', auth, removeLike);
router.post('/add-bookmark', auth, addBookMark);
router.post('/remove-bookmark', auth, removeBookMark);
router.post('/thumbnailupload', auth, thumbnailUpload);
router.post('/delete-blog', auth, isAuthor, deleteBlog);
router.get('/get-blogs-by-category', getGetBlogsByCategory);
router.post('/edit-blog', auth, isAuthor, editBlog);

module.exports = router;