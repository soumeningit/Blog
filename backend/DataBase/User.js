const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ["user", "author", "employee", "admin"]
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    token: {
        type: String,
    },
    resetTokenTime: {
        type: Date,
    },
    image: {
        type: String,
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
    }],
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);