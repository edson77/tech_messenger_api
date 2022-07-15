const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    userId1:{
        type: String,
    },
    userId2:{
        type: String,
    },
    isUser:{
        type: Boolean,
        default: true
    }
    
},
{timestamps:true}
)
module.exports = mongoose.model('Conversation', ConversationSchema)