const mongoose = require('mongoose')
const Contact = require('./contact')
const Otp = require('./otp')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: false,
        minlength: 3,
        maxlength: 14,
      },
      phone:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true,
      },
      isRegister:{
        type: Boolean,
        required: false,
        default: false,
      },
      image: {
        type: String,
        contentType: String
      },
      about:{
        type: String,
        required: false,
        minlength: 3,
        maxlength: 150,
      },
      created: {
        type: Date,
        default: Date.now
      },
})


module.exports = mongoose.model('User', UserSchema)