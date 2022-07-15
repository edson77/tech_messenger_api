const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    nameGroup:{
        type: String,
        required: true
    },
    descriptionGroup:{
        type: String,
        required: false
    },
    imageGroupPath:{
        type: String,
        required: false
    }
    
},
{timestamps:true}
)
module.exports = mongoose.model('Group', GroupSchema)