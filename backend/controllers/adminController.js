const { createCategory, createSubCategory, adminLogin, adminProfile, getPostsAdmin, getUsersAdmin, getUserDetailsById } = require("../service/adminService");

async function createCategoryController(req, res) {
    console.log("Create Category Controller Invoked");
    const userId = req.user.id;
    console.log("User ID from token:", userId);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Request Body:", req.body);

    const { categories } = req.body;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ message: "Categories data is required and should be a non-empty array." });
    }

    const response = await createCategory(categories, userId);

    console.log("Service Response:", response);

    if (!response.success) {
        return res.status(500).json({ message: response.message });
    }

    return res.status(201).json({ message: "Category created successfully", category: response.category });

}

async function createSubCategoryController(req, res) {

    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorised"
        });
    };
    console.log("user Id : " + userId);
    console.log("Request Body:", req.body);

    const { category, subCategory } = req.body;

    if (!category || !Array.isArray(subCategory) || subCategory.length === 0) {
        return res.status(404).json({
            message: "Data Missing"
        });
    }

    const response = await createSubCategory(userId, category, subCategory);

    console.log("Service Response:", response);

    if (!response.success) {
        return res.status(response.status).json({ message: response.message });
    }

    return res.status(response.status).json({
        data: response.data,
        message: response.message
    });

}

async function adminLoginController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required."
        });
    }

    const response = await adminLogin(email, password);
    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message
        });
    }

    return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token: response.token,
            user: response.user,
            profile: response.profile
        }
    });

};

async function adminProfileController(req, res) {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorised"
        });
    };

    const response = await adminProfile(userId);
    console.log("Service Response:", response);

    if (!response.success) {
        return res.status(response.status).json({
            message: response.message
        });
    }

    return res.status(200).json({
        message: "Profile fetched successfully",
        data: {
            stats: response.stats,
            recentActivities: response.recentActivities || [],
            recentPosts: response.recentPosts || []
        }
    });

}

async function getPostsController(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const response = await getPostsAdmin(page, limit);

    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message,
            data: null
        });
    }

    return res.status(response.status).json({
        success: true,
        message: response.message,
        data: response.data
    });
}

async function getUsersController(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const response = await getUsersAdmin(page, limit);

    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message,
            data: null
        });
    }

    return res.status(response.status).json({
        success: true,
        message: response.message,
        data: response.data
    });
}

async function getUserDetailsByIdController(req, res) {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });
    }
    const response = await getUserDetailsById(userId);

    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            message: response.message
        });
    }

    return res.status(response.status).json({
        success: true,
        message: response.message,
        data: {
            user: response.data
        }
    });
}

module.exports = {
    createCategoryController,
    createSubCategoryController,
    adminLoginController,
    adminProfileController,
    getPostsController,
    getUsersController,
    getUserDetailsByIdController
};