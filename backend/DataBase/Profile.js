const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    profilePicture: {
        type: String
    },
    dob: {
        type: String
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    pincode: {
        type: String
    },
    bio: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    socialMedia: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        },
        github: {
            type: String
        },
        others: [{
            name: {
                type: String
            },
            link: {
                type: String
            }
        }]
    },

}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);