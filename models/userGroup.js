const mongoose = require('mongoose')
const User = require('./user')
const Group = require('./group')

const usergroupSchema = new mongoose.Schema({
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
        required:true
    },
    date_adhesion:{
        type: Date,
        default: Date.now
    }
    
},
{timestamps:true}
)
module.exports = mongoose.model('UserGroup', usergroupSchema)