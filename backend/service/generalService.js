const Category = require('../database/Categories');
const Comment = require('../database/Comment');
const Content = require('../database/Content');
const Token = require('../database/Token');
const User = require('../database/User');
const UserProfile = require('../database/UserProfile');
const loadTemplate = require('../utils/emailTemplate');
const { generateTokenUsingEmail } = require('../utils/generateToken');
const generateUsername = require('../utils/generateUsername');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function getAllCategories() {
    try {
        const categories = await Category.find({});
        if (categories.length === 0) {
            return {
                success: true,
                message: "No categories found.",
                status: 200,
                data: []
            }
        }

        // Get post counts for all categories in one aggregation query
        const postCounts = await Content.aggregate([
            { $match: { status: 'published' } },
            { $unwind: '$categories' },
            {
                $group: {
                    _id: '$categories',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Create a map of category ID to post count for quick lookup
        const postCountMap = {};
        postCounts.forEach(item => {
            postCountMap[item._id.toString()] = item.count;
        });

        const categoriesMap = {};
        const subCategoriesMap = {};

        categories.forEach(cat => {
            const catObj = cat.toObject();
            catObj.postCount = postCountMap[cat._id.toString()] || 0;

            if (cat.parent) {
                if (!subCategoriesMap[cat.parent]) {
                    subCategoriesMap[cat.parent] = [];
                }
                subCategoriesMap[cat.parent].push(catObj);
            } else {
                categoriesMap[cat._id] = catObj;
            }
        });

        const categoriesWithSubs = Object.values(categoriesMap).map(cat => {
            return {
                ...cat,
                subCategories: subCategoriesMap[cat._id] || []
            }
        });

        // console.log("Fetched Categories:", categoriesWithSubs);

        return {
            success: true,
            message: "Categories fetched successfully.",
            status: 200,
            data: categories,
            response: categoriesWithSubs
        };
    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error: Unable to fetch categories.",
            status: 500,
            data: null
        }
    }
};

async function getBlogs() {
    try {
        // populate category names (Content stores categories as an array)
        const blogs = await Content.find({})
            .select('title author description tags thumbnail createdAt categories subCategory readingTime')
            .populate({ path: 'categories', select: 'name' })
            // .populate({ path: 'subCategory', select: 'name' })
            .sort({ createdAt: -1 });
        if (blogs.length === 0) {
            return {
                success: true,
                message: "No blogs found.",
                status: 200,
                data: []
            }
        }
        // Convert populated category documents to simple name arrays for consumers
        const mapped = blogs.map(b => ({
            ...b.toObject(),
            categoryNames: (b.categories || []).map(c => (c && c.name) || null).filter(Boolean),
            subCategoryNames: (b.subCategory || []).map(s => (s && s.name) || null).filter(Boolean)
        }));

        return {
            success: true,
            message: "Blogs fetched successfully.",
            status: 200,
            data: mapped
        };
    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error: Unable to fetch blogs.",
            status: 500,
            data: null
        }
    }
}

async function getBlogById(blogId, userId) {
    try {
        let blog = await Content.findById(blogId)
            .populate({
                path: 'authorId',
                select: 'name email follower userProfile',
                populate: { path: 'userProfile', select: 'username bio profilePic about createdAt socialLinks location' }
            })
            .populate({ path: 'categories', select: 'name' })
            .populate({ path: 'subCategory', select: 'name' });

        // console.log("Fetched Blog:", blog);

        const totalPosts = await Content.countDocuments({ authorId: blog?.authorId?._id });

        if (!blog) {
            return {
                success: false,
                message: "Blog not found.",
                status: 404,
                data: null
            }
        }

        blog = blog.toObject();

        if (userId && userId.trim() !== "" && userId !== "null") {
            blog.isLiked = blog.likes.includes(userId);
            const userData = await User.findById(userId).select('savedPosts');
            blog.isSaved = userData?.savedPosts.includes(blogId) || false;
            blog.likesCount = blog.likes ? blog.likes.length : 0;
            blog.authorDetails = {
                name: blog.authorId.name,
                email: blog.authorId.email,
                username: blog.authorId.userProfile?.username || '',
                bio: blog.authorId.userProfile?.bio || '',
                profilePic: blog.authorId.userProfile?.profilePic || '',
                about: blog.authorId.userProfile?.about || '',
                userProfile: blog.authorId.userProfile._id || null,
                authorId: blog.authorId._id,
                articlesCount: totalPosts || 0,
                followerCount: blog.authorId.follower ? blog.authorId.follower.length : 0,
                socialLinks: blog.authorId.userProfile?.socialLinks || {},
                location: blog.authorId.userProfile?.location || '',
                createdAt: blog.authorId.userProfile?.createdAt || null,

            }
            blog.authorId = blog.authorId._id;
        } else {
            blog.likes = undefined; // hide likes array
        }

        blog.likesCount = blog.likes ? blog.likes.length : 0;
        blog.likes = undefined; // hide likes array

        const relatedPosts = await Content.find({
            _id: { $ne: blogId },
            status: 'published',
            $or: [
                { categories: { $in: blog.categories.map(c => c._id) } },
                { subCategory: blog.subCategory?._id },
                { tags: { $in: blog.tags || [] } }
            ]
        })
            .select('title author description thumbnail createdAt categories subCategory tags readingTime')
            .populate({ path: 'categories', select: 'name' })
            .populate({ path: 'subCategory', select: 'name' })
            .sort({ createdAt: -1 })
            .limit(6);

        const commentData = await Comment.find({ contentId: blogId }).sort({ createdAt: -1 });
        if (commentData.length === 0) {
            return {
                success: true,
                message: "Blog fetched successfully, but no comments found.",
                status: 200,
                data: {
                    post: blog,
                    comments: [],
                    relatedPosts: relatedPosts || []
                }
            };
        };

        return {
            success: true,
            message: "Blog fetched successfully.",
            status: 200,
            data: {
                post: blog,
                comments: commentData,
                relatedPosts: relatedPosts || []
            }
        };
    }
    catch (error) {
        console.error("Error in getBlogById:", error);
        return {
            success: false,
            message: "Internal Server Error: Unable to fetch blog.",
            status: 500,
            data: null
        }
    }
}

async function setViews(postId) {
    try {
        const blog = await Content.findById(postId);
        if (!blog) {
            return {
                success: false,
                message: "Blog not found.",
                status: 404,
                data: null
            };
        }
        blog.views = (blog.views || 0) + 1;
        await blog.save();
        return {
            success: true,
            message: "View count updated successfully.",
            status: 200,
            data: null
        };
    } catch (error) {
        console.error("Error in setViews:", error);
        return {
            success: false,
            message: "Internal Server Error: Unable to update views.",
            status: 500,
            data: null
        };
    }
};

async function getHomePageData() {
    try {
        // status: published, more likes, views, comments should be 
        // considered as featured

        // Compute featured posts by likes count, then views, then comments count.
        // We use an aggregation pipeline to compute array sizes and sort by them.
        const featuredData = await Content.aggregate([
            { $match: { status: 'published' } },
            {
                $addFields: {
                    likesCount: { $size: { $ifNull: ['$likes', []] } },
                    commentsCount: { $size: { $ifNull: ['$comments', []] } }
                }
            },
            { $sort: { likesCount: -1, views: -1, commentsCount: -1 } },
            { $limit: 5 },
            // populate category names via $lookup
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories'
                }
            },
            {
                $project: {
                    title: 1,
                    author: 1,
                    description: 1,
                    thumbnail: 1,
                    createdAt: 1,
                    readingTime: 1,
                    views: 1,
                    likesCount: 1,
                    commentsCount: 1,
                    categories: { $map: { input: '$categories', as: 'c', in: { _id: '$$c._id', name: '$$c.name' } } }
                }
            }
        ]);

        const recentPosts = await Content.find({ status: 'published' })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title author description thumbnail createdAt categories readingTime')
            .populate({ path: 'categories', select: 'name' });

        return {
            success: true,
            message: "Home page data fetched successfully.",
            status: 200,
            data: {
                featuredPosts: featuredData,
                latestPosts: recentPosts
            }
        };
    } catch (error) {
        console.error("Error in getHomePageData:", error);
        return {
            success: false,
            message: "Internal Server Error: Unable to fetch home page data.",
            status: 500,
            data: null
        };
    }
};

async function searchPosts(query) {
    try {
        const regex = new RegExp(query, 'i'); // case-insensitive search
        const posts = await Content.find({
            status: 'published',
            $or: [
                { title: regex },
                { description: regex },
                { tags: regex }
            ]
        })
            .select('title author description thumbnail createdAt categories readingTime')
            .populate({ path: 'categories', select: 'name' })
            .sort({ createdAt: -1 });

        if (posts.length === 0) {
            return {
                success: true,
                message: "No posts found matching the search query.",
                status: 200,
                data: []
            };
        }

        return {
            success: true,
            message: "Search completed successfully.",
            status: 200,
            data: posts
        };
    } catch (error) {
        console.error("Error in searchPosts:", error);
        return {
            success: false,
            message: "Internal Server Error: Unable to complete search.",
            status: 500,
            data: null
        };
    }
};

async function checkContent(contentId) {
    try {
        const content = await Content.findById(contentId);
        if (!content) {
            return {
                success: false,
                message: "Content not found.",
                status: 404,
                data: null
            };
        }
        return {
            success: true,
            message: "Content found.",
            status: 200,
            data: content
        };
    } catch (error) {
        console.error("Error in checkContent:", error);
        return {
            success: false,
            message: "Internal Server Error: Unable to check content.",
            status: 500,
            data: null
        };
    }
};

async function subscribeFromCTA(email) {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return {
                success: true,
                message: "Already registered, you can login",
                status: 1048,
                data: {
                    name: user.name
                }
            };
        };

        const isExsist = await Token.findOne({
            email: email,
        });

        if (isExsist) {
            return {
                success: true,
                message: "You reached your current limit try after 5 minutes",
                status: 1050,
                data: null
            };
        }

        const token = generateTokenUsingEmail(email);
        const frontendURL = process.env.FRONTEND_URL;
        const url = frontendURL + "/subscribe/token/" + token + "?email=" + encodeURIComponent(email);

        const tokenData = await Token.create({
            email: email,
            token: token,
            tokenType: "subscribe-from-cta",
        });

        if (!tokenData) {
            return {
                success: false,
                message: "Internal Server Error:Token creation failed.",
                status: 500,
                data: null
            };
        };

        const htmlBody = loadTemplate("SubscribeFromCTA.html", {
            appName: process.env.APP_NAME,
            email: email,
            registerUrl: url,
            supportEmail: process.env.SUPPORT_EMAIL,
            currentYear: new Date().getFullYear()
        });

        const mailData = await mailSender(process.env.APP_NAME, email, "Next step for subscribe", htmlBody);

        console.log("Mail Data:", mailData);

        if (!mailData.accepted || mailData.accepted.length === 0) {
            return {
                success: false,
                status: 1051,
                message: "Failed to send email",
                data: null
            }
        }

        return {
            success: true,
            status: 200,
            message: "Password reset token generated successfully",
            data: { url }
        };

    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error.",
            status: 500,
            data: null
        };
    }
};

async function subscribeFromCTANext(token, email, name, password) {
    try {
        const tokenData = await Token.findOne({
            token: token,
            email: email,
            tokenType: "subscribe-from-cta"
        });
        if (!tokenData) {
            return {
                success: false,
                message: "Invalid or expired token.",
                status: 400,
                data: null
            };
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return {
                success: false,
                message: "User with this email already exists.",
                status: 409,
                data: null
            };
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            isVerified: true
        });
        if (!newUser) {
            return {
                success: false,
                message: "User creation failed.",
                status: 500,
                data: null
            };
        };

        let userName = generateUsername(name);

        // need to check username uniqueness
        const isUsernameExist = await UserProfile.findOne({ userName: userName });
        if (isUsernameExist) {
            const generatedId = uuidv4().split('-')[0];
            userName = `${userName}${generatedId}`;
        }

        const userProfile = await UserProfile.create({
            userId: newUser._id,
            username: userName,
        });

        if (!userProfile) {
            return {
                success: false,
                message: "User profile creation failed.",
                status: 500,
                data: null
            };
        }

        newUser.userProfile = userProfile._id;
        await newUser.save();

        await Token.deleteOne({ _id: tokenData._id });

        return {
            success: true,
            message: "Subscription completed successfully.",
            status: 201,
            data: {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: userProfile.username
            }
        };

    } catch (error) {
        console.error("Error in subscribeFromCTANext:", error);
        return {
            success: false,
            message: "Internal Server Error: Unable to complete subscription.",
            status: 500,
            data: null
        };
    }
}

module.exports = {
    getAllCategories,
    getBlogs,
    getBlogById,
    setViews,
    getHomePageData,
    searchPosts,
    checkContent,
    subscribeFromCTA,
    subscribeFromCTANext
};