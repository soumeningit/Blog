const express = require('express');
const router = express.Router();

const {
    getAllCategoriesController,
    getBlogsController,
    getBlogByIdController,
    setViewsController,
    getHomePageDataController,
    searchPostsController,
    subscribeFromCTAController,
    subscribeFromCTANextController
} = require('../controllers/generalController');

router.get("/get-all-categories", getAllCategoriesController);
router.get("/get-blogs", getBlogsController);
router.get("/get-blog-by-id", getBlogByIdController);
router.post("/set-views", setViewsController);
router.get("/get-home-page-data", getHomePageDataController);
router.get("/search-posts", searchPostsController);
router.post("/subscribe-from-cta", subscribeFromCTAController);
router.post("/subscribe-from-cta-next", subscribeFromCTANextController);

module.exports = router;