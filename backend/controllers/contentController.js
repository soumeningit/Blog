const {
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
    upgradeUserRole
} = require("../service/contentService");

async function createBlogController(req, res) {
    console.log("Create Blog Controller Invoked");
    const userId = req?.user?.id || req?.user?.userId;
    console.log("User ID from token:", userId);
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to write a blog."
        });
    }

    const { title, description, category, tags, subCategories } = req.body;

    console.log("title : " + title);
    console.log("description : " + description);
    console.log("category : " + category);
    console.log("tags : " + tags);
    console.log("subCategories : " + subCategories);

    if (!title || !description || !category) {
        return res.status(400).json({
            message: "Bad Request: Title, description, and category are required fields."
        });
    }

    console.log("Files in request:", req.files);

    const thumbnail = req?.files?.thumbnail;
    const heroSectionImage = req?.files?.featuredImage;
    let thumbnailUrl = null;
    let heroSectionImageUrl = null;

    console.log("Thumbnail Image:", thumbnail);
    console.log("Hero Section Image:", heroSectionImage);

    if (thumbnail) {
        console.log("Uploading thumbnail image to cloud...");
        const response = await uploadFileToCloud(thumbnail, 'thumbnail');
        if (!response.success) {
            return res.status(500).json({
                message: "Internal Server Error: Unable to upload thumbnail image."
            });
        }
        thumbnailUrl = response.url;
    }

    if (heroSectionImage) {
        const response = await uploadFileToCloud(heroSectionImage, 'featuredImage');
        if (!response.success) {
            return res.status(500).json({
                message: "Internal Server Error: Unable to upload hero section image."
            });
        }
        heroSectionImageUrl = response.url;
    }

    console.log("Thumbnail URL:", thumbnailUrl);
    console.log("Hero Section Image URL:", heroSectionImageUrl);

    const response = await createBlogService(
        userId,
        title,
        description,
        category,
        tags,
        JSON.parse(subCategories || "[]"),
        thumbnailUrl,
        heroSectionImageUrl
    );

    console.log("Create Blog Service Response:", response);

    if (!response.success) {
        return res.status(500).json({
            message: "Internal Server Error: Unable to create blog."
        });
    }
    return res.status(201).json({
        message: "Blog created successfully.",
        data: response.data
    });
}

async function saveBlogController(req, res) {

    const creatorId = req?.user?.id || req?.user?.userId;
    console.log("Creator ID from token:", creatorId);
    if (!creatorId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to save a blog."
        });
    };

    const { id, content } = req.body;
    console.log("Blog ID:", id);
    console.log("Content:", content);
    if (!id || !content) {
        return res.status(400).json({
            message: "Bad Request: id and content are required fields."
        });
    }

    const response = await saveBlogService(id, content, creatorId);
    console.log("Save Blog Service Response:", response);

    if (!response.success) {
        return res.status(response.status).json({
            message: response.error
        });
    }

    return res.status(200).json({
        message: "Blog saved successfully.",
        data: response.data
    });
}

async function createCommentController(req, res) {
    const userId = req?.user?.id || req?.user?.userId;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to comment."
        });
    }

    const { postId, message, commentType } = req.body;
    if (!postId || !message) {
        return res.status(400).json({
            message: "Bad Request: postId and message are required fields."
        });
    }

    const response = await createComment(userId, postId, message, commentType);
    if (!response.success) {
        return res.status(response.status).json({
            message: response.error
        });
    }
    return res.status(201).json({
        message: "Comment created successfully.",
        data: response.data
    });

}

async function likePostController(req, res) {
    const userId = req?.user?.id || req?.user?.userId;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to like a post."
        });
    }
    const { postId } = req.body;
    if (!postId) {
        return res.status(400).json({
            message: "Bad Request: postId is a required field."
        });
    }
    const response = await likePost(userId, postId);
    if (!response.success) {
        return res.status(response.status).json({
            message: response.error
        });
    }
    return res.status(200).json({
        message: "Post liked successfully.",
        data: response.data
    });
}

async function savePostController(req, res) {
    const userId = req?.user?.id || req?.user?.userId;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to save a post."
        });
    }
    const { postId } = req.body;
    if (!postId) {
        return res.status(400).json({
            message: "Bad Request: postId is a required field."
        });
    }
    const response = await savePost(userId, postId);
    if (!response.success) {
        return res.status(response.status).json({
            message: response.message
        });
    }
    return res.status(200).json({
        message: "Post saved successfully.",
        data: response.data
    });
}

async function followAuthorController(req, res) {
    console.log("Follow Author Controller Invoked");
    const userId = req?.user?.id || req?.user?.userId;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to follow an author."
        });
    }
    const { authorId } = req.body;
    if (!authorId) {
        return res.status(400).json({
            message: "Bad Request: authorId is a required field."
        });
    }
    const response = await followAuthor(userId, authorId);
    console.log("Follow Author Service Response:", response);
    if (!response.success) {
        return res.status(response.status).json({
            message: response.message
        });
    }
    return res.status(200).json({
        message: "Author followed successfully.",
    });
}

async function getPostsByAuthorController(req, res) {
    const authorId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    if (!authorId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to view their posts."
        });
    }
    const response = await getPostsByAuthor(authorId, parseInt(page), parseInt(limit));
    if (!response.success) {
        return res.status(response.status).json({
            message: response.message
        });
    }
    return res.status(200).json({
        message: "Posts retrieved successfully.",
        data: response.data
    });
}

async function getSubCategoriesController(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to view sub-categories."
        });
    }

    const { category } = req.query;
    console.log("Category ID from query:", category);
    if (!category) {
        return res.status(400).json({
            message: "Bad Request: category is a required field."
        });
    }

    const response = await getSubCategories(category);
    if (!response.success) {
        return res.status(response.status).json({
            message: response.message
        });
    }

    return res.status(200).json({
        message: "Sub-categories retrieved successfully.",
        data: response.data
    });

}

async function editPostController(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to view sub-categories."
        });
    };

    const postId = req.params.id;
    if (!postId) {
        return res.status(400).json({
            message: "Bad Request: postId is a required field."
        });
    }

    console.log("postId : " + postId);

    const thumbnail = req?.files?.thumbnail;
    const heroSectionImage = req?.files?.heroSectionImage;
    let thumbnailUrl = null;
    let heroSectionImageUrl = null;

    console.log("Thumbnail Image:", thumbnail);
    console.log("Hero Section Image:", heroSectionImage);

    if (thumbnail) {
        console.log("Uploading thumbnail image to cloud...");
        const response = await uploadFileToCloud(thumbnail, 'thumbnail');
        if (!response.success) {
            return res.status(500).json({
                message: "Internal Server Error: Unable to upload thumbnail image."
            });
        }
        thumbnailUrl = response.url;
    }

    if (heroSectionImage) {
        const response = await uploadFileToCloud(heroSectionImage, 'featuredImage');
        if (!response.success) {
            return res.status(500).json({
                message: "Internal Server Error: Unable to upload hero section image."
            });
        }
        heroSectionImageUrl = response.url;
    }

    const { title, description, category, subCategory, tags, body, status } = req.body;

    const response = await editContent(postId, { title, description, category, subCategory, tags, body, status, thumbnailUrl, heroSectionImageUrl }, userId);

    if (!response.success) {
        return res.status(response.status).json({
            message: response.message
        });
    }

    return res.status(200).json({
        message: "Post edited successfully.",
        data: response.data
    });

}

async function fileUploadController(req, res) {
    const file = req?.files?.file;
    if (!file) {
        return res.status(400).json({
            message: "Bad Request: No file uploaded."
        });
    }

    const response = await uploadFileToCloud(file, 'bodyImage');
    if (!response.success) {
        return res.status(500).json({
            message: "Internal Server Error: Unable to upload file."
        });
    }
    return res.status(200).json({
        message: "File uploaded successfully.",
        url: response.url
    });
};

async function upgradeRoleController(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: User need to be logged in first to upgrade role."
        });
    }
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({
            message: "Bad Request: email is a required field."
        });
    }
    const response = await upgradeUserRole(userId, email);
    if (!response.success) {
        return res.status(response.status).json({
            message: response.message
        });
    }
    return res.status(200).json({
        message: "User role upgraded successfully.",
        data: response.data
    });
}

module.exports = {
    createBlogController,
    saveBlogController,
    createCommentController,
    likePostController,
    savePostController,
    followAuthorController,
    getPostsByAuthorController,
    getSubCategoriesController,
    editPostController,
    fileUploadController,
    upgradeRoleController
};