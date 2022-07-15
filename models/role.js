const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        default: "user",
        minlength: 3,
      },
    description:{
        type: Date,
        default: ""
    },
    create_at:{
        type: Date,
        required: Date.now
    },

})

module.exports = mongoose.model('Role', RoleSchema)