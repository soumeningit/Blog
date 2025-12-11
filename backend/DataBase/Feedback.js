const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    type: {
        type: String,
        enum: ['comment', 'rating', 'contact'],
        required: true
    },
    email: {
        type: String,
        trim: true,
        default: null
    },
    subject: {
        type: String,
        trim: true,
        default: null
    },
    username: {
        type: String,
        trim: true,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);