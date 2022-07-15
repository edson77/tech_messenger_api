const mongoose = require('mongoose')
const User = require('./user')

const MessageSchema = new mongoose.Schema({
    
    senderId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required:true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
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
module.exports = mongoose.model('Message', MessageSchema)