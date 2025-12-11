const Category = require("../database/Categories");
const UserProfile = require("../database/UserProfile");
const User = require("../database/User");
const Content = require("../database/Content");
const Comment = require("../database/Comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function saveCategory(cat, userId, parentId = null) {
    // Create main category
    const newCategory = new Category({
        name: cat.name,
        description: cat.description || "",
        colour: cat.color || "",
        slug: cat.slug || null,
        parent: parentId,
        creatorId: userId,
    });

    const savedCategory = await newCategory.save();

    // If this category has subcategories, create them too
    if (cat.subcategories && cat.subcategories.length > 0) {
        for (const sub of cat.subcategories) {
            await saveCategory(sub, userId, savedCategory._id);
        }
    }

    return savedCategory;
}

async function createCategory(categories, userId) {
    try {
        const created = [];

        // Loop through incoming root-level categories
        for (const cat of categories) {
            const result = await saveCategory(cat, userId, null);
            created.push(result);
        }

        return {
            success: true,
            createdCategories: created
        };


    } catch (error) {
        console.error("Error in createCategory:", error);
        return {
            success: false,
            message: error.message
        };
    }
}

async function createSubCategory(userId, category, subCategory) {
    try {
        const categoryData = await Category.findById(category);
        if (!categoryData) {
            return {
                success: false,
                status: 404,
                message: "Category not found"
            }
        }

        const createdSubCategories = [];

        for (const subCat of subCategory) {
            const newSubCategory = new Category({
                name: subCat.name,
                description: subCat.description || "",
                colour: subCat.colour || "",
                slug: subCat.slug || subCat.name.toLowerCase().replace(/\s+/g, '-'),
                parent: categoryData._id,
                creatorId: userId,
            });

            const savedSubCategory = await newSubCategory.save();
            createdSubCategories.push(savedSubCategory);
        }

        return {
            success: true,
            createdSubCategories,
            status: 201,
            message: "Subcategories created successfully"
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: "Internal Server Error"
        }
    }
}

async function adminLogin(email, password) {
    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return {
                success: false,
                message: "Invalid email or password",
                status: 401
            }
        }

        const role = userData.role;
        if (role.toLowerCase().trim() !== 'admin') {
            return {
                success: false,
                message: "This email is not registered as admin",
                status: 403
            }
        };

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return {
                status: 401,
                success: false,
                message: "Invalid password"
            }
        }

        const payload = {
            id: userData._id,
            email: userData.email,
            role: userData.role,
            name: userData.name
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        const profile = await UserProfile.findOne({ userId: userData._id });

        return {
            success: true,
            status: 200,
            message: "Login successful",
            token,
            user: payload,
            profile
        };

    } catch (error) {
        return {
            success: false,
            message: error.message || "Internal Server Error",
            status: 500
        }
    }
};

async function adminProfile(userId) {
    try {
        // Fetch admin without password; we only need metadata for response
        const userData = await User.findById(userId)
            .select('-password')
            .populate('userProfile')
            .lean();
        if (!userData) {
            return {
                success: false,
                message: "User not found",
                status: 404
            }
        }

        // Run aggregates in parallel for minimal latency
        const [
            totalPosts,
            totalUsers,
            totalComments,
            viewsAgg,
            recentPosts
        ] = await Promise.all([
            Content.countDocuments(),
            User.countDocuments(),
            Comment.countDocuments(),
            Content.aggregate([
                { $group: { _id: null, total: { $sum: "$views" } } }
            ]),
            Content.find({}, "title thumbnail views createdAt status author")
                .sort({ createdAt: -1 })
                .limit(6)
                .lean()
        ]);

        const totalViews = viewsAgg?.[0]?.total || 0;

        return {
            success: true,
            status: 200,
            message: "Admin profile data fetched",
            user: userData,
            stats: {
                totalPosts,
                totalUsers,
                totalComments,
                totalViews
            },
            recentPosts
        };

    } catch (error) {
        return {
            success: false,
            message: error.message || "Internal Server Error",
            status: 500
        }
    }
}

async function getPostsAdmin(page = 1, limit = 10) {
    try {
        // Validate pagination parameters
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Cap at 100
        const skip = (pageNum - 1) * limitNum;

        // Fetch total count and paginated posts in parallel
        const [totalPosts, posts] = await Promise.all([
            Content.countDocuments(),
            Content.find(
                {},
                "title description thumbnail views status author categories readingTime createdAt updatedAt"
            )
                .sort({ createdAt: -1 })
                .populate("categories.0", "name")
                .skip(skip)
                .limit(limitNum)
                .lean()
        ]);
        // Calculate pagination metadata
        const totalPages = Math.ceil(totalPosts / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            success: true,
            status: 200,
            message: "Posts fetched successfully",
            data: {
                posts,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    totalPosts,
                    limit: limitNum,
                    hasNextPage,
                    hasPrevPage
                }
            }
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Internal Server Error",
            status: 500
        }
    }
}

async function getUsersAdmin(page = 1, limit = 10) {
    try {
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Cap at 100
        const skip = (pageNum - 1) * limitNum;

        const [totalUsers, users] = await Promise.all([
            User.countDocuments(),
            User.find({}, "name email role createdAt status")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum)
                .lean()
        ]);

        // Enrich users with their post counts
        const usersWithPostCounts = await Promise.all(
            users.map(async (user) => {
                const postCount = await Content.countDocuments({ authorId: user._id });
                return {
                    ...user,
                    postCount
                };
            })
        );

        const totalPages = Math.ceil(totalUsers / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            success: true,
            status: 200,
            message: "Users fetched successfully",
            data: {
                users: usersWithPostCounts,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    totalUsers,
                    limit: limitNum,
                    hasNextPage,
                    hasPrevPage
                }
            }
        };

    } catch (error) {
        return {
            success: false,
            message: error.message || "Internal Server Error",
            status: 500
        }
    }
};

async function getUserDetailsById(userId) {
    try {
        const userData = await User.findById(userId)
            .select('-password')
            .populate('userProfile')
            .lean();
        if (!userData) {
            return {
                success: false,
                message: "User not found",
                status: 404
            }
        }
        return {
            success: true,
            status: 200,
            message: "User details fetched successfully",
            data: userData
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Internal Server Error",
            status: 500
        }
    }
}

module.exports = {
    createCategory,
    createSubCategory,
    adminLogin,
    adminProfile,
    getPostsAdmin,
    getUsersAdmin,
    getUserDetailsById
};