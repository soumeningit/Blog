const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'author', 'student', 'mentor'],
        default: 'user'
    },
    is_authorised: {
        type: Boolean,
        default: false
    },
    savedPosts: [String],
    follower: [String],
    following: [String],
    isOAuthUser: {
        type: Boolean,
        default: false
    },
    oAuthData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OAuthUser'
    },
    userProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;