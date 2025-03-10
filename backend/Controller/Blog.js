const Profile = require('../DataBase/Profile');
const Category = require('../DataBase/Category');
const SubCategory = require('../DataBase/SubCategory');
const Content = require('../DataBase/Content');
const User = require('../DataBase/User');
const mongoose = require('mongoose');
const { cloudinaryConnect } = require('../Config/clodinaryConfig');
const sharp = require('sharp');
const { uploadFileToCloudinary } = require('../Utils/fileUploader');


exports.createBlog = async (req, res) => {
    try {
        console.log("INSIDE CREATE BLOG....");
        console.log("req.body : " + JSON.stringify(req.body));
        const { title, description, content, category, subCategory, contentId } = req.body;
        console.log("title, category, subCategory : " + title + " " + category + " " + JSON.stringify(subCategory) + typeof (subCategory));

        if (!title || !description || !content || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }

        let subCategoryArray = subCategory;
        if (typeof (subCategory) === 'string') {
            subCategoryArray = JSON.parse(subCategory);
        }
        console.log("subCategoryArray : " + JSON.stringify(subCategoryArray));

        console.log("req.user : " + JSON.stringify(req.user));
        const userId = req.user.id;
        const profileId = req.user.additionalDetails;

        if (!userId || !profileId) {
            return res.status(400).json({
                success: false,
                message: "Invalid User"
            });
        }

        const isUser = await User.findById({ _id: userId });
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("isUser : " + isUser);

        const isProfile = await Profile.findById({ _id: profileId });
        if (!isProfile) {
            return res.status(400).json({
                success: false,
                message: "Profile not found"
            });
        }

        console.log("isProfile : " + isProfile);

        const isCategory = await Category.findById({ _id: category });
        if (!isCategory) {
            return res.status(400).json({
                success: false,
                message: "Category not found"
            });
        }

        console.log("isCategory : " + isCategory);

        let isSubCategory = [];

        for (let i = 0; i < subCategoryArray.length; i++) {
            const subCategory = await SubCategory.findById({ _id: subCategoryArray[i].id });
            if (!subCategory) {
                return res.status(400).json({
                    success: false,
                    message: "SubCategory not found"
                });
            }
            isSubCategory.push(subCategory);
        }

        if (isSubCategory.length !== subCategoryArray.length) {
            return res.status(400).json({
                success: false,
                message: "SubCategory not found"
            });
        }

        console.log("isSubCategory : " + JSON.stringify(isSubCategory));
        console.log("subCategoryArray : " + subCategoryArray + " " + typeof (subCategoryArray));

        const subCategoryIds = subCategoryArray.map((item) => item.id);
        console.log("subCategoryIds : " + subCategoryIds);

        const newContent = await Content.findByIdAndUpdate(
            { _id: contentId },
            {
                title,
                description,
                content,
                userDetail: userId,
                profileDetails: profileId,
                category,
                subCategory: subCategoryIds
            },
            { new: true }   // Return the updated document
        );
        console.log("newContent : " + JSON.stringify(newContent));

        if (!newContent) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Blog Created Successfully",
            data: newContent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        console.log("INSIDE GET ALL BLOGS....");
        const allBlogs = await Content.find({}).populate('userDetail').populate('profileDetails').populate('category').populate('subCategory');
        if (!allBlogs) {
            return res.status(404).json({
                success: false,
                message: "No Blogs Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "All Blogs",
            data: allBlogs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.getBlogById = async (req, res) => {
    try {
        console.log("INSIDE GET BLOG BY ID....");
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide Blog Id"
            });
        }

        // const blog = await Content.findById({ _id: id })
        //     .populate('userDetail')
        //     .populate('profileDetails')
        //     .populate('category')
        //     .populate('subCategory')
        //     .populate('comments')
        //     .populate('likes');

        // const blog = await Content.findById(id)
        //     .populate({
        //         path: "userDetail",
        //         select: "firstName lastName image email"
        //     })
        //     .populate("profileDetails")
        //     .populate("category")
        //     .populate("subCategory")
        //     .populate({
        //         path: "comments",
        //         populate: {
        //             path: "replies", // Fetch replies for each comment
        //             populate: { path: "userDetail", select: "firstName lastName email image" }, // Populate user details for replies
        //         },
        //     })
        //     .populate("likes");

        const blog = await Content.findById(id)
            .populate({
                path: "userDetail",
                select: "firstName lastName image email",
            })
            .populate("profileDetails")
            .populate("category")
            .populate("subCategory")
            .populate({
                path: "comments",
                populate: [
                    {
                        path: "userDetail", // ✅ Populate user details for each top-level comment
                        select: "firstName lastName image email",
                    },
                    {
                        path: "replies", // ✅ Fetch replies for each comment
                        populate: {
                            path: "userDetail",
                            select: "firstName lastName email image",
                        },
                    },
                ],
            })
            .populate({
                path: "likes",
                select: "firstName lastName image email",
            });


        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog Found",
            data: blog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.getBlogByUserId = async (req, res) => {
    try {
        console.log("INSIDE GET BLOG BY USER ID....");
        const id = req.query.userId;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide User Id"
            });
        }
        const isUSerExsist = await User.findById({ _id: id });
        if (!isUSerExsist) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        };
        const blogData = await Content.find({ userDetail: id });
        if (!blogData) {
            return res.status(404).json({
                success: false,
                message: "No Blogs Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "All Blogs",
            data: blogData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.addLike = async (req, res) => {
    try {
        console.log("INSIDE ADD LIKE....");
        console.log("req.body : " + JSON.stringify(req.body));
        const { blogId, userId } = req.body;
        console.log("blogId, userId : " + blogId + " " + userId);
        if (!blogId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }
        const isUser = await User.findById({ _id: userId });
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isBlog = await Content.findById({ _id: blogId });
        if (!isBlog) {
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            });
        }

        const isAlreadyLiked = isBlog.likes.includes(userId);
        if (isAlreadyLiked) {
            return res.status(400).json({
                success: false,
                message: "Already Liked"
            });
        }

        isBlog.likes.push(userId);
        const updatedBlog = await isBlog.save();
        if (!updatedBlog) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Liked Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.removeLike = async (req, res) => {
    try {
        console.log("INSIDE REMOVE LIKE....");
        console.log("req.body : " + JSON.stringify(req.body));
        const { blogId, userId } = req.body;
        console.log("blogId, userId : " + blogId + " " + userId);
        if (!blogId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }
        const isUser = await User.findById({ _id: userId });
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isBlog = await Content.findById({ _id: blogId });
        if (!isBlog) {
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            });
        }
        const isAlreadyLiked = isBlog.likes.includes(userId);
        if (!isAlreadyLiked) {
            return res.status(400).json({
                success: false,
                message: "Not Liked"
            });
        }
        isBlog.likes = isBlog.likes.filter((item) => item.toString() !== userId.toString());
        const updatedBlog = await isBlog.save();
        if (!updatedBlog) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Like Removed Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.addBookMark = async (req, res) => {
    try {
        console.log("INSIDE ADD BOOKMARK....");
        console.log("req.body : " + JSON.stringify(req.body));

        const { blogId, userId } = req.body;
        console.log("blogId, userId : " + blogId + " " + userId);
        if (!blogId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const blog = await Content.findById({ _id: blogId });
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            });
        }
        const isAlreadyBookMarked = user.bookmarks.includes(blogId);
        if (isAlreadyBookMarked) {
            return res.status(400).json({
                success: false,
                message: "Already BookMarked"
            });
        }
        user.bookmarks.push(blogId);
        const updatedUser = await user.save();
        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        blog.bookmarkedBy.push(userId);
        const updatedBlog = await blog.save();
        if (!updatedBlog) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "BookMarked Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.removeBookMark = async (req, res) => {
    try {
        console.log("INSIDE REMOVE BOOKMARK....");
        console.log("req.body : " + JSON.stringify(req.body));

        const { blogId, userId } = req.body;
        console.log("blogId, userId : " + blogId + " " + userId);
        if (!blogId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const blog = await Content.findById({ _id: blogId });
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            });
        }

        const isAlreadyBookMarked = user.bookmarks.includes(blogId);
        if (!isAlreadyBookMarked) {
            return res.status(400).json({
                success: false,
                message: "Not BookMarked"
            });
        }

        user.bookmarks = user.bookmarks.filter((item) => item.toString() !== blogId.toString());
        const updatedUser = await user.save();
        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }

        const isBookMarkedBy = blog.bookmarkedBy.includes(userId);
        if (!isBookMarkedBy) {
            return res.status(400).json({
                success: false,
                message: "Not BookMark"
            });
        }
        blog.bookmarkedBy = blog.bookmarkedBy.filter((item) => item.toString() !== userId.toString());
        const updatedBlog = await blog.save();
        if (!updatedBlog) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "BookMark Removed Successfully"
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.thumbnailUpload = async (req, res) => {
    try {
        console.log("INSIDE THUMBNAIL UPLOAD....");
        console.log("req.body : " + JSON.stringify(req.body));
        console.log("req.file : " + JSON.stringify(req.files));
        const { userId, title, description, profile } = req.body;
        if (!userId || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }
        const file = req.files.thumbnail;
        console.log("thumbnail : " + JSON.stringify(file));
        try {
            cloudinaryConnect();
        } catch (error) {
            console.log("Clodinary Connection failed");
        }
        // Upload file to clodinary
        // const fileData = await sharp(thumbnail[0].buffer).quality(20).toFormat('jpeg').toBuffer();
        const cloudinaryData = await uploadFileToCloudinary(file, process.env.CLOUD_FOLDER_NAME, 200, 20);
        console.log("cloudinaryData : " + JSON.stringify(cloudinaryData));
        if (!cloudinaryData) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }

        const content = new Content({
            title,
            description,
            thumbnail: cloudinaryData.secure_url,
            userDetail: userId,
            profileDetails: profile,
            content: "Image Uploaded"
        });
        console.log("content : " + JSON.stringify(content));
        const contentData = await content.save();
        console.log("contentData : " + JSON.stringify(contentData));
        if (!contentData) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }

        console.log("contentData : " + JSON.stringify(contentData));

        return res.status(200).json({
            success: true,
            message: "Thumbnail Uploaded Successfully",
            data: contentData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        console.log("INSIDE DELETE BLOG....");
        console.log("req.body : " + JSON.stringify(req.body));
        const { blogId, userId } = req.body;
        console.log("blogId, userId : " + blogId + " " + userId);
        if (!blogId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }
        const isUser = await User.findById({ _id: userId });
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isBlog = await Content.findById({ _id: blogId });
        if (!isBlog) {
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            });
        }
        const isDelete = await Content.findByIdAndDelete({ _id: blogId });
        if (!isDelete) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blog Deleted Successfully"
        });
    } catch (error) {
        console.log("Error in deleteBlog : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getGetBlogsByCategory = async (req, res) => {
    try {
        console.log("INSIDE GET BLOGS BY CATEGORY....");
        const { categoryId } = req.query;
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Please provide Category Id"
            });
        }
        const isCategory = await Category.findById({ _id: categoryId });
        if (!isCategory) {
            return res.status(400).json({
                success: false,
                message: "Category not found"
            });
        }
        const blogs = await Content.find({ category: categoryId });
        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: "No Blogs Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blogs Found",
            data: blogs
        });
    } catch (error) {
        console.log("Error in getGetBlogsByCategory : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};