const express = require('express')
const messageCRTL = require('./../controllers/MessageGroupController')
const multer = require('./../middlewares/multer-config')


const router = express.Router()

router.post('/:groupId',multer.array('media_path',10), messageCRTL.createGroupMessage);

router.get('/:groupId', messageCRTL.findPrivateGroupMessages);


module.exports = router