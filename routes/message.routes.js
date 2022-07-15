const express = require('express')
const messageCRTL = require('../controllers/MessagePriveeController')
const multer = require('./../middlewares/multer-config')

const router = express.Router()

router.post('/:userId',multer.array('media_path',10), messageCRTL.create_private_message);

router.get('/:userId', messageCRTL.findPrivateMessages);


module.exports = router