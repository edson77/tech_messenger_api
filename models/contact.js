const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: false,
        minlength: 3,
        maxlength: 14,
      },
      phoneNumber:{
        type: Number,
        required: true,
        minlength: 7,
        maxlength: 20,
      },
      isRegister:{
        type: Boolean,
        required: false,
        default: false,
      },
      avatar: {
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
      user:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


module.exports = mongoose.model('Contact', ContactSchema)