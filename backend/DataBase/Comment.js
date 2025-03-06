const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userDetail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Content",
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
}, { timestamps: true });

// Virtual populate to fetch replies
commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentComment",
});

commentSchema.set("toObject", { virtuals: true });
commentSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('Comment', commentSchema);
