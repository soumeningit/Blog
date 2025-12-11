const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    bio: {
        type: String,
        trim: true,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    socialLinks: {
        twitter: { type: String, trim: true, default: "" },
        facebook: { type: String, trim: true, default: "" },
        linkedin: { type: String, trim: true, default: "" },
        instagram: { type: String, trim: true, default: "" },
        github: { type: String, trim: true, default: "" },
        other: { type: Object, default: {} }
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    dateOfBirth: {
        type: Date,
    },
    contactNumber: {
        type: String,
        trim: true,
        default: ""
    },
    country: {
        type: String,
        trim: true,
        default: ""
    },
    about: {
        type: String,
        trim: true,
        default: ""
    },
    username: {
        type: String,
        trim: true,
        default: "",
        unique: true
    },
    location: {
        type: String,
        trim: true,
        default: ""
    },

}, { timestamps: true });
module.exports = mongoose.model("UserProfile", userProfileSchema);