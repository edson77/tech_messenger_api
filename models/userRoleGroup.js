const mongoose = require('mongoose')
const User = require('./user')
const Group = require('./group')

const userrolegroupSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    role:{
        type: String,
        default: 'user',
        required: true
    },
    date_nomination:{
        type: Date,
        default: Date.now
    }
    
},
{timestamps:true}
)
module.exports = mongoose.model('UserRoleGroup', userrolegroupSchema)