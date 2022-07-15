const mongoose = require('mongoose')
const User = require('./user')

const OtpSchema = new mongoose.Schema({
    password:{
        type: String,
        required: false,
        minlength: 4,
      },
    created_at:{
        type: Date,
        default: Date.now
    },
    expired_at:{
        type: Date,
        required: true
    },
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

module.exports = mongoose.model('Otp', OtpSchema)