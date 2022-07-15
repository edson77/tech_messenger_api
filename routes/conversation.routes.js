const express = require('express')
const conversationCRTL = require('./../controllers/conversationController')


const router = express.Router()

router.get('/', conversationCRTL.findUserConversation);



module.exports = router