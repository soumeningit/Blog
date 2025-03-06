const express = require('express');
const router = express.Router();

const { auth, isAdmin, isAuthor } = require("../Middleware/AuthMiddleware");
const { createSubCategory, getSubCategoriesBycategory } = require("../Controller/SubCategory");

router.post("/create-sub-category", auth, isAdmin, createSubCategory);
router.get("/get-sub-categories-by-category", auth, isAuthor, getSubCategoriesBycategory);

module.exports = router;