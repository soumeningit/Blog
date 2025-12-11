const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    // Who will receive the notification
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Origin of notification (optional)
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    // Notification Type (for classification + UI)
    type: {
        type: String,
        enum: [
            'system',       // system messages
            'admin',        // from admin
            'blog',         // blog created, approved, rejected
            'comment',      // comment on blog
            'like',         // someone liked your blog
            'follow',       // follow you
            'role',         // role upgrade / downgrade
            'request',      // user requests (e.g., author request)
            'message'       // chat/message notifications
        ],
        required: true
    },

    // Title for quick display
    title: {
        type: String,
        trim: true,
        default: ""
    },

    // Core message
    message: {
        type: String,
        required: true,
        trim: true
    },

    // Related content (Flexible dynamic metadata)
    meta: {
        blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", default: null },
        commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
        action: { type: String, default: "" },
        extra: { type: Object, default: {} } // catch-all for any extra info
    },

    // Notification status
    isRead: {
        type: Boolean,
        default: false
    },

    // For grouping notifications by priority
    priority: {
        type: String,
        enum: ["low", "normal", "high"],
        default: "normal"
    }

}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
