const Content = require("../database/Content");
const User = require("../database/User")
const Category = require("../database/Categories");
const { sanitizeTiptapHtml } = require("../utils/contentSanitizer");
const { uploadFile, getPublicUrl } = require("../utils/fileUpload");
const { v4: uuidv4 } = require('uuid');
const Comment = require("../database/Comment");
const Notification = require("../database/Notification");
const jwt = require("jsonwebtoken");
const { generateSummary } = require("./llmService");

async function uploadFileToCloud(file, type) {
    try {
        const filePath = await uploadFile(
            'blogspace',
            file.tempFilePath,
            `${uuidv4()}_${file.name}`,
            `blogs/${type}/`
        );

        console.log('File uploaded to path:', filePath);

        const publicUrl = getPublicUrl('blogspace', filePath);

        console.log('Public URL:', publicUrl);
        return {
            success: true,
            message: "File uploaded successfully.",
            url: publicUrl
        };
    } catch (error) {
        return {
            success: false,
            message: "File upload failed.",
            url: null
        }
    }

}

async function createBlogService(userId, title, description, category, tags = [], subCategory = [], thumbnail = null, heroSectionImage = null) {
    try {
        console.log("Creating blog with data:", {
            userId,
            title,
            description,
            category,
            tags,
            subCategory,
            thumbnail,
            heroSectionImage
        });
        const userData = await User.findById({ _id: userId })
            .select("name email role");
        console.log("User Data:", userData)
        if (!userData) {
            return {
                success: false,
                error: "User not found.",
                status: 404,
                data: null
            }
        }

        // normalize categories and subCategory to arrays
        const categoriesArr = Array.isArray(category) ? category : (category ? [category] : []);
        const subCategoryArr = Array.isArray(subCategory) ? subCategory : (subCategory ? [subCategory] : []);

        // ensure at least one category is provided
        if (!categoriesArr.length) {
            return {
                success: false,
                error: "At least one category is required.",
                status: 400,
                data: null
            }
        }

        // validate that provided category ids exist
        const foundCategories = await Category.find({ _id: { $in: categoriesArr } }).select("_id");
        console.log("Found Categories:", foundCategories);
        if (foundCategories.length !== categoriesArr.length) {
            return {
                success: false,
                error: "One or more categories not found.",
                status: 400,
                data: null
            }
        }

        // validate subcategories if provided
        if (subCategoryArr.length) {
            const foundSubs = await Category.find({ _id: { $in: subCategoryArr } }).select("_id");
            if (foundSubs.length !== subCategoryArr.length) {
                return {
                    success: false,
                    error: "One or more subcategories not found.",
                    status: 400,
                    data: null
                }
            }
        }

        // normalize tags
        const updatedTags = Array.isArray(tags)
            ? tags
            : (typeof tags === "string" && tags.length > 0
                ? tags.split(",").map(t => t.trim())
                : []);
        console.log("Normalized Tags:", updatedTags);

        const blogData = new Content({
            title,
            description,
            categories: categoriesArr,
            tags: updatedTags,
            subCategory: subCategoryArr,
            authorId: userId,
            thumbnail,
            heroSectionImage,
            author: {
                id: userData._id,
                name: userData.name,
                email: userData.email,
                role: userData.role
            }
        })

        const savedBlog = await blogData.save();
        console.log("Saved Blog:", savedBlog);

        return ({
            success: true,
            error: null,
            status: 201,
            data: savedBlog
        });

    } catch (error) {
        console.error("Error in createBlogService:", error);
        return {
            success: false,
            error: "Internal Server Error: Unable to create blog.",
            status: 500,
            data: null
        }
    }
}

async function saveBlogService(id, content, creatorId) {
    try {
        console.log("Saving blog with data:", {
            id,
            content,
            creatorId
        });
        const cleanContent = sanitizeTiptapHtml(content);

        const readingTime = Math.ceil(cleanContent.split(' ').length / 100); // assuming 100 wpm

        const updatedContent = await Content.findOneAndUpdate(
            { _id: id, authorId: creatorId },
            {
                body: cleanContent,
                readingTime: readingTime
            },
            { new: true }
        );

        if (!updatedContent) {
            return {
                success: false,
                error: "Blog not found or unauthorized.",
                status: 404,
                data: null
            }
        }

        return {
            success: true,
            error: null,
            status: 200,
            data: updatedContent
        };

    } catch (error) {
        console.error("Error in saveBlogService:", error);
        return {
            success: false,
            error: "Internal Server Error: Unable to save blog.",
            status: 500,
            data: null
        }
    }
}

async function createComment(userId, postId, message, commentType = 'text') {
    try {
        const userData = await User.findById({ _id: userId })
            .select("name email");
        console.log("User Data for Comment:", userData);
        if (!userData) {
            return {
                success: false,
                message: "User not found.",
                status: 404,
                data: null
            }
        }
        const commentData = {
            contentId: postId,
            commenterId: userId,
            username: userData.name,
            comment: message,
            commentType: commentType,
            commentorDetails: {
                name: userData.name,
                email: userData.email,
                id: userData._id
            }
        };

        const createdComment = await Comment.create(commentData);
        console.log("Created Comment:", createdComment);

        const updatedContent = await Content.findByIdAndUpdate(postId, { $push: { comments: createdComment._id } });
        console.log("Updated Content with new Comment:", updatedContent);

        return {
            success: true,
            message: "Comment created successfully.",
            status: 201,
            data: createdComment
        };

    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error: Unable to create comment.",
            status: 500,
            data: null
        }
    }
}

async function likePost(userId, postId) {
    try {
        const post = await Content.findById(postId);
        if (!post) {
            return {
                success: false,
                message: "Post not found.",
                status: 404,
                data: null
            }
        }

        if (post.likes.includes(userId)) {
            return {
                success: true,
                message: "Post already liked by this user.",
                status: 200,
                data: null
            }
        }

        post.likes.push(userId);
        const savedPost = await post.save();

        return {
            success: true,
            message: "Post liked successfully.",
            status: 200,
            data: savedPost
        };

    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error: Unable to like post.",
            status: 500,
            data: null
        }
    }
}

async function savePost(userId, postId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found.",
                status: 404,
                data: null
            }
        }
        if (user.savedPosts.includes(postId)) {
            return {
                success: true,
                message: "Post already saved by this user.",
                status: 200,
                data: null
            }
        }
        user.savedPosts.push(postId);
        const savedUser = await user.save();
        return {
            success: true,
            message: "Post saved successfully.",
            status: 200,
            data: savedUser
        };
    }
    catch (error) {
        return {
            success: false,
            message: "Internal Server Error: Unable to save post.",
            status: 500,
            data: null
        }
    }
}

async function followAuthor(userId, authorId) {
    try {
        console.log("Follow Author Service Invoked" + " userId: " + userId + " authorId: " + authorId);
        const user = await User.findById(userId);
        const author = await User.findById(authorId);
        if (!user || !author) {
            return {
                success: false,
                message: "User or Author not found.",
                status: 404,
                data: null
            }
        }

        if (user.following.includes(authorId)) {
            return {
                success: true,
                message: "Already following this author.",
                status: 200,
                data: null
            }
        }
        user.following.push(authorId);
        author.follower.push(userId);

        await user.save();
        await author.save();
        return {
            success: true,
            message: "Author followed successfully.",
            status: 200,
            data: null
        };
    }
    catch (error) {
        return {
            success: false,
            message: "Internal Server Error: Unable to follow author.",
            status: 500,
            data: null
        }
    }
}

async function getPostsByAuthor(authorId, page = 1, limit = 10) {
    try {
        const userData = await User.findById(authorId).select("-password");

        if (!userData) {
            return {
                success: false,
                message: "Author not found.",
                status: 404,
                data: null
            };
        }

        const skip = (page - 1) * limit;

        const posts = await Content.find({ authorId })
            .select("-body -tags -subCategory -heroSectionImage")
            .populate({ path: 'categories', select: 'name' })
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPosts = await Content.countDocuments({ authorId });

        return {
            success: true,
            message: "Posts fetched successfully.",
            status: 200,
            data: {
                posts,
                pagination: {
                    total: totalPosts,
                    page,
                    limit,
                    totalPages: Math.ceil(totalPosts / limit),
                }
            }
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Internal Server Error: Unable to fetch posts by author.",
            status: 500,
            data: null
        };
    }
}

async function getSubCategories(category) {
    try {
        const parentCategory = await Category.findById({ _id: category });
        console.log("Parent Category:", parentCategory);
        if (!parentCategory) {
            return {
                success: false,
                message: "Category not found.",
                status: 404,
                data: null
            };
        }

        const subCategories = await Category.find({ parent: parentCategory._id });
        if (subCategories.length === 0) {
            return {
                success: true,
                message: "No sub-categories found for the given category.",
                status: 200,
                data: []
            };
        }

        return {
            success: true,
            message: "Sub-categories fetched successfully.",
            status: 200,
            data: subCategories
        };

    } catch (error) {
        console.error("Error in getSubCategories:", error);
        return {
            success: false,
            message: "Internal Server Error: Unable to fetch sub-categories.",
            status: 500,
            data: null
        }
    }
}

async function editContent(postId, data, userId) {
    try {
        const post = await Content.findById(postId);
        if (!post) {
            return {
                success: false,
                message: "Post not found.",
                status: 404,
                data: null
            };
        }

        if (userId !== String(post.authorId)) {
            return {
                success: false,
                message: "Unauthorized: You are not the author of this post.",
                status: 403,
                data: null
            };
        }

        const { title, description, body, category, subCategory, tags, status, thumbnailUrl, heroSectionImageUrl } = data;

        if (title && title.length > 1 && title != null) {
            post.title = title;
        }
        if (description && description.length > 1 && description != null) {
            post.description = description;
        }
        if (body && body.length > 1 && body != null) {
            post.body = body;
        }
        if (tags && tags.length > 0 && tags != null) {
            const updatedTags = Array.isArray(tags)
                ? tags
                : (typeof tags === "string" && tags.length > 0
                    ? tags.split(",").map(t => t.trim())
                    : []);
            post.tags = updatedTags;
        }

        if (subCategory) {
            if (category != String(post.categories[0])) {
                return {
                    success: false,
                    message: "Missmatch of category",
                    status: 400,
                    data: null
                }
            } else {
                // normalize categories and subCategory to arrays
                const categoriesArr = Array.isArray(category) ? category : (category ? [category] : []);
                const subCategoryArr = Array.isArray(subCategory) ? subCategory : (subCategory ? [subCategory] : []);

                // validate that provided category ids exist
                const foundCategories = await Category.find({ _id: { $in: categoriesArr } }).select("_id");
                console.log("Found Categories:", foundCategories);
                if (foundCategories.length !== categoriesArr.length) {
                    return {
                        success: false,
                        error: "One or more categories not found.",
                        status: 400,
                        data: null
                    }
                }

                // validate subcategories if provided
                if (subCategoryArr.length) {
                    const foundSubs = await Category.find({ _id: { $in: subCategoryArr } }).select("_id");
                    if (foundSubs.length !== subCategoryArr.length) {
                        return {
                            success: false,
                            error: "One or more subcategories not found.",
                            status: 400,
                            data: null
                        }
                    }
                }

                post.subCategory = subCategoryArr;
            }
        }

        if (status && status != null) {
            post.status = status;
        }

        if (thumbnailUrl && thumbnailUrl != null) {
            post.thumbnail = thumbnailUrl;
        }

        if (heroSectionImageUrl && heroSectionImageUrl != null) {
            post.heroSectionImage = heroSectionImageUrl;
        }
        post.updatedAt = new Date();
        const updatedData = await post.save();
        if (!updatedData) {
            return {
                success: false,
                status: 500,
                data: null,
                message: "Post updation failed"
            }
        }

        return {
            success: true,
            status: 200,
            data: updatedData,
            message: "Post updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error: Unable to update content.",
            status: 500,
            data: null
        };
    }
};

async function upgradeUserRole(userId, email) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found.",
                status: 404,
                data: null
            }
        }

        if (user.email !== email) {
            return {
                success: false,
                message: "Email does not match the user's email.",
                status: 400,
                data: null
            }
        }

        // If already an author
        if (user.role === "author") {
            return {
                success: false,
                message: "User is already an author.",
                status: 400,
                data: null
            };
        }


        const payload = { id: user._id, email: user.email, name: user.name, role: "author" };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Create notification
        await Notification.create({
            userId: user._id,
            type: 'role',
            title: 'Role Upgraded to Author',
            message: 'Congratulations! Your role has been upgraded. You can now create blogs.',
            meta: {
                action: "role_upgrade",
                role: "author"
            },
            priority: "normal"
        });

        user.role = "author";
        user.is_authorised = true;
        await user.save();


        return {
            success: true,
            message: "User role upgraded to author successfully.",
            status: 200,
            data: { user: payload, token: token }
        };

    } catch (error) {
        console.error("Error in upgradeUserRole:", error);
        return {
            success: false,
            message: "Internal Server Error: Unable to upgrade user role.",
            status: 500,
            data: null
        };
    }
}

async function getSummary(contentId) {
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

        const lastUpdated = content.updatedAt;
        console.log("Content Last Updated At:", lastUpdated);
        const currentTime = new Date();
        if (currentTime < lastUpdated && content.summary) {
            return {
                success: true,
                message: "Summary is up-to-date.",
                status: 200,
                data: content.summary
            };
        }

        const summaryResponse = await generateSummary(content.body);
        console.log("Summary Response from LLM Service:", summaryResponse);
        if (!summaryResponse.success) {
            return {
                success: false,
                message: "Failed to generate summary.",
                status: 500,
                data: null
            };
        }
        content.summary = summaryResponse.summary;
        content.updatedAt = new Date();
        await content.save();
        return {
            success: true,
            message: "Summary generated successfully.",
            status: 200,
            data: summaryResponse?.summary || content.summary
        };

    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error: Unable to generate summary.",
            status: 500,
            data: null
        };
    }
}


module.exports = {
    createBlogService,
    saveBlogService,
    uploadFileToCloud,
    createComment,
    likePost,
    savePost,
    followAuthor,
    getPostsByAuthor,
    getSubCategories,
    editContent,
    upgradeUserRole,
    getSummary
};