const Comment = require("../DataBase/Comment");
const Content = require("../DataBase/Content");
const User = require("../DataBase/User");

exports.addComment = async (req, res) => {
    try {
        console.log("INSIDE ADD COMMENT");
        console.log(req.body);
        const { userId, blogId, content, parentComment } = req.body;
        const user_id = req.user.id;
        if (!userId || !blogId || !content) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }
        if (userId !== user_id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const blog = await Content.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        console.log("Blog", blog);
        const comment = await Comment.findOne(
            {
                $and: [
                    { userDetail: userId },
                    { blog: blogId },
                ]
            }
        );
        if (comment) {
            return res.status(400).json({
                success: false,
                message: "Comment already exists"
            });
        }
        const newComment = new Comment({
            userDetail: userId,
            content,
            blog: blogId,
            parentComment: parentComment || null
        });
        const response = await newComment.save();
        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
        blog.comments.push(response._id);
        const updatedBlog = await blog.save();
        if (!updatedBlog) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }

        const newCommentData = await Comment.findById(response._id).populate("userDetail");
        console.log("New Comment", newCommentData);
        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            data: newCommentData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.addReply = async (req, res) => {
    try {
        console.log("INSIDE ADD REPLY ....");
        console.log("req.body : " + JSON.stringify(req.body));
        const { userId, blogId, reply, parentComment } = req.body;
        const user_id = req.user.id;
        console.log("userId : " + userId + " blogId : " + blogId + " reply : " + reply + " parentComment : " + parentComment);
        if (!userId || !blogId || !reply || !parentComment) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }
        if (userId.toString() !== user_id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const blog = await Content.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        const comment = await Comment.findById(parentComment);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }
        const newComment = new Comment({
            userDetail: userId,
            content: reply,
            blog: blogId,
            parentComment: parentComment
        });
        const response = await newComment.save();
        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }

        const commentData = await Comment.findById({ _id: parentComment })
            .populate("userDetail")
            .populate({
                path: "replies",
                populate: {
                    path: "userDetail",
                    select: "firstName lastName email image",
                },
            })
        res.status(200).json({
            success: true,
            message: "Reply added successfully",
            data: commentData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
};