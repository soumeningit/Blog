const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
    },
    userDetail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    profileDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
    }],
    bookmarkedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);