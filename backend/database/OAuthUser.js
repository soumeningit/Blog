const mongoose = require("mongoose");

const oAuthUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    provider: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("OAuthUser", oAuthUserSchema);