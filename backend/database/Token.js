const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        unique: true,
    },
    tokenType: {
        type: String,
        enum: ['reset', 'otp', 'subscribe-from-cta'],
        default: 'otp'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m' // OTP will expire after 5 minutes
    },
}, { timestamps: true });

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;