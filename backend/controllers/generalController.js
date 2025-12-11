const { getAllCategories, getBlogs, getBlogById, setViews, getHomePageData, searchPosts, subscribeFromCTA, subscribeFromCTANext } = require("../service/generalService");
const { validateEmail } = require("../utils/validation");

async function getAllCategoriesController(req, res) {
    const userId = req?.user?.id;
    const response = await getAllCategories(userId);

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
        data: response.data,
        response: response.response
    });
}

async function getBlogsController(req, res) {
    const response = await getBlogs();

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

async function getBlogByIdController(req, res) {
    let userId = req?.user?.id || req?.user?.userId || null;
    console.log("User ID in getBlogByIdController:", userId);
    const blogId = req.query.id;
    if (!blogId) {
        return res.status(400).json({
            success: false,
            message: "Blog ID is required.",
            data: null
        });
    }
    userId = req.query.userId || userId;
    console.log("Final User ID used in getBlogByIdController:", userId);

    const response = await getBlogById(blogId, userId);

    console.log("getBlogById Service Response:", response);

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

async function setViewsController(req, res) {
    const postId = req.body.postId;
    if (!postId) {
        return res.status(400).json({
            success: false,
            message: "Post ID is required to set views.",
            data: null
        });
    }
    const response = await setViews(postId);
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
};

async function getHomePageDataController(req, res) {
    const response = await getHomePageData();

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

async function searchPostsController(req, res) {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Search query is required.",
            data: null
        });
    }

    const response = await searchPosts(query);

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
};

async function subscribeFromCTAController(req, res) {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required.",
            data: null
        });
    }

    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
        return res.status(400).json({
            success: false,
            message: `${email} is not a valid email.`,
            data: null
        });
    }

    const response = await subscribeFromCTA(email);

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
};

async function subscribeFromCTANextController(req, res) {
    const { token, email, name, password } = req.body;

    if (!token || !email || !name || !password) {
        return res.status(400).json({
            success: false,
            message: "Token, email, name, and password are required.",
            data: null
        });
    }

    const response = await subscribeFromCTANext(token, email, name, password);

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

module.exports = {
    getAllCategoriesController,
    getBlogsController,
    getBlogByIdController,
    setViewsController,
    getHomePageDataController,
    searchPostsController,
    subscribeFromCTAController,
    subscribeFromCTANextController
};
