const mongoose = require('mongoose')
const Message = require('./message')

const mediaSchema = new mongoose.Schema({
    reference_id:{
        type: String,
        required: true
    },
    isUser:{
        type: Boolean,
        required: true,
        default:true
    },
    media_type:{
        type: String,
        required: true
    },
    media_url:{
        type: String,
        required: true
    },
    media_size:{
        type: String,
        required: false
    },
    media_length:{
        type: String,
        required: false
    },
    
},
{timestamps:true}
)
module.exports = mongoose.model('Media', mediaSchema)