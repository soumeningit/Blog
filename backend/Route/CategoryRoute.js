const express = require('express');
const router = express.Router();

const { auth, isAdmin, isAuthor } = require("../Middleware/AuthMiddleware");
const { createCategory, getCategories } = require("../Controller/Category");

router.post("/create-category", auth, isAdmin, createCategory);
router.get("/get-categories", auth, isAuthor, getCategories);

module.exports = router;