const User = require("../database/User");
const UserProfile = require("../database/UserProfile");
const bcrypt = require("bcrypt");
const { uploadFileToCloud } = require("./contentService");
const Content = require("../database/Content");

async function getUserProfile(userId) {
    try {
        const userData = await User.findById(userId).select("-password -__v");
        if (!userData) {
            return {
                success: false,
                message: "User not found",
                data: null
            }
        }

        const profile = await UserProfile.findOne({ userId: userId });

        const userProfile = {
            ...userData._doc,
            profile: profile
        }
        return {
            success: true,
            message: "User profile retrieved successfully",
            data: userProfile
        }

    } catch (error) {
        return {
            success: false,
            message: "Error retrieving user profile",
            error: error.message,
            data: null
        }
    }
};

async function updateUserPassword(userId, oldPassword, newPassword) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }
        const password = user.password;
        const decryptPassword = await bcrypt.compare(oldPassword, password);
        if (!decryptPassword) {
            return {
                success: false,
                message: "Old password is incorrect"
            }
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return {
            success: true,
            message: "Password updated successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "Error updating password",
            error: error.message
        }
    }
}

async function updateProfilePic(userId, image) {
    try {
        const profile = await UserProfile.findOne({ userId: userId });
        if (!profile) {
            return {
                success: false,
                message: "User profile not found"
            }
        }

        const imageResponse = await uploadFileToCloud(image, "profile-picture");
        console.log("Uploaded Image URL:", imageResponse);
        if (!imageResponse) {
            return {
                success: false,
                message: "Error uploading image"
            }
        }

        profile.profilePic = imageResponse.url;
        await profile.save();

        return {
            success: true,
            message: "Profile picture updated successfully",
            data: imageResponse.url
        };

    } catch (error) {
        return {
            success: false,
            message: "Error updating profile picture",
            error: error.message
        }
    }
};

async function updateUserProfile(userId, profileData) {
    try {
        const profile = await UserProfile.findOne({ userId: userId });
        if (!profile) {
            return {
                success: false,
                message: "User profile not found"
            }
        }

        console.log("Updating profile :", profileData);

        for (const key of Object.keys(profileData)) {
            if (key === "role" || key === "id" || key === "userId") {
                continue; // Skip updating immutable fields
            }
            console.log(`Updating profile field ${key} to`, profileData[key]);
            if (key === "socialLinks" && typeof profileData[key] === "object") {
                profile.socialLinks = {
                    ...profile.socialLinks,
                    ...profileData[key]
                };
            } else {
                profile[key] = profileData[key];
            }
        }

        await profile.save();

        return {
            success: true,
            message: "Profile updated successfully"
        };

    } catch (error) {
        return {
            success: false,
            message: "Error updating profile",
            error: error.message
        }
    }
};

async function getSavedPosts(userId, page = 1, limit = 10) {
    try {
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Cap at 100

        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found",
                status: 404
            }
        }

        const savedPostIds = user.savedPosts || [];
        const totalSavedPosts = savedPostIds.length;

        if (totalSavedPosts === 0) {
            return {
                success: true,
                message: "No saved posts found",
                status: 200,
                data: {
                    posts: [],
                    pagination: {
                        currentPage: pageNum,
                        totalPages: 0,
                        totalPosts: 0,
                        limit: limitNum,
                        hasNextPage: false,
                        hasPrevPage: false
                    }
                }
            }
        }

        const skip = (pageNum - 1) * limitNum;
        const paginatedPostIds = savedPostIds.slice(skip, skip + limitNum);

        // Fetch posts with populated fields
        const posts = await Content.find({ _id: { $in: paginatedPostIds } })
            .select('title description readingTime author categories createdAt tags thumbnail')
            .populate('categories', 'name slug colour')
            .sort({ createdAt: -1 })
            .lean();

        console.log("Fetched Posts:", posts);

        // Build collections from all categories across posts
        const collections = {};
        posts.forEach(post => {
            const postCategories = Array.isArray(post.categories) ? post.categories : [];
            postCategories.forEach(category => {
                if (category && category.name) {
                    if (collections[category.name]) {
                        collections[category.name].count += 1;
                    } else {
                        collections[category.name] = {
                            name: category.name,
                            slug: category.slug || '',
                            color: category.colour || 'gray',
                            id: category._id,
                            count: 1
                        };
                    }
                }
            });
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalSavedPosts / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            success: true,
            message: "Saved posts retrieved successfully",
            status: 200,
            data: {
                posts,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    totalPosts: totalSavedPosts,
                    limit: limitNum,
                    hasNextPage,
                    hasPrevPage
                },
                collections: Object.values(collections) // Convert to array
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Error retrieving saved posts",
            error: error.message,
            status: 500
        }
    }
};

async function handleToggleSave(userId, postId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found",
                status: 404
            }
        }
        const savedPosts = user.savedPosts || [];
        const postIndex = savedPosts.indexOf(postId);
        let message = "";
        if (postIndex === -1) {
            // Not saved, add to savedPosts
            savedPosts.push(postId);
            message = "Post saved successfully";
        } else {
            // Already saved, remove from savedPosts
            savedPosts.splice(postIndex, 1);
            message = "Post removed from saved posts";
        }
        user.savedPosts = savedPosts;
        await user.save();
        return {
            success: true,
            message: message,
            status: 200
        };
    } catch (error) {
        return {
            success: false,
            message: "Error toggling saved post",
            error: error.message,
            status: 500
        }
    }
};

async function searchSavedPosts(userId, query, page = 1, limit = 10) {
    try {
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Cap at 100
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found",
                status: 404
            }
        }

        const savedPostIds = user.savedPosts || [];
        if (savedPostIds.length === 0) {
            return {
                success: true,
                message: "No saved posts found",
                status: 200,
                data: {
                    posts: [],
                    pagination: {
                        currentPage: pageNum,
                        totalPages: 0,
                        totalPosts: 0,
                        limit: limitNum,
                        hasNextPage: false,
                        hasPrevPage: false
                    }
                }
            }
        } else {
            const regex = new RegExp(query, 'i'); // case-insensitive search
            const filter = {
                _id: { $in: savedPostIds },
                $or: [
                    { title: regex },
                    { description: regex },
                    { tags: regex }
                ]
            };
            const totalMatchingPosts = await Content.countDocuments(filter);
            const totalPages = Math.ceil(totalMatchingPosts / limitNum);
            const hasNextPage = pageNum < totalPages;
            const hasPrevPage = pageNum > 1;
            const skip = (pageNum - 1) * limitNum;
            const posts = await Content.find(filter)
                .select('title description readingTime author categories createdAt tags thumbnail')
                .populate('categories', 'name slug colour')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum)
                .lean();

            return {
                success: true,
                message: "Search completed successfully",
                status: 200,
                data: {
                    posts,
                    pagination: {
                        currentPage: pageNum,
                        totalPages,
                        totalPosts: totalMatchingPosts,
                        limit: limitNum,
                        hasNextPage,
                        hasPrevPage
                    }
                }
            }
        }

    } catch (error) {
        return {
            success: false,
            message: "Error searching saved posts",
            error: error.message,
            status: 500
        }
    }
}

module.exports = {
    getUserProfile,
    updateUserPassword,
    updateProfilePic,
    updateUserProfile,
    getSavedPosts,
    handleToggleSave,
    searchSavedPosts
};