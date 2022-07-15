const mongoose = require('mongoose')
const User = require('./user')

const NotificationSchema = new mongoose.Schema({
    reference_type: {
        type: String,
        required: true,
    },
    reference_id: {
        type: Number,
        default: ""
    },
    notification_data: {
        type: Number,
        default: ""
    },
    create_at: {
        type: Date,
        required: Date.now
    },
    updated_at: {
        type: Date,
        required: Date.now
    },
    is_read: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

})


module.exports = mongoose.model('Notification', NotificationSchema)