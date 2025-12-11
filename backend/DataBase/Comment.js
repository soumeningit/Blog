const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required: true
    },
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    commentType: {
        type: String,
        enum: ['text', 'reply'],
        default: 'text'
    },
    commentorDetails: {
        type: Object,
        default: {}
    },
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);