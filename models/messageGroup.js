const mongoose = require('mongoose')
const User = require('./user')
const Group = require('./group')

const MessageSchema = new mongoose.Schema({
    
    senderId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required:true
    },
    groupId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Group",
        required:true
    },
    msg_txt:{
        type: String,
        required:false,
        default:''
    },
    is_read:{   
        type: Boolean,
        required:false,
        default:false
    },
    
},
{timestamps: true}
)
module.exports = mongoose.model('MessageGroup', MessageSchema)