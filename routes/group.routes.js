const express = require('express');
const group = require('../models/group');
const groupCRTL = require('./../controllers/groupController')
const multer = require('./../middlewares/multer-config')


const router = express.Router()

//create and find groups 
router.post('/', multer.single('image'), groupCRTL.createGroup);
router.get('/', groupCRTL.findAllGroup);


router.get('/addUser/:groupId/:userId', groupCRTL.addUserInGroup);
router.get('/:groupId/users', groupCRTL.findUsersGroup);

router.get('/makeAsAdmin/:groupId/:userId', groupCRTL.makeAsAdmin);
router.get('/removeAsAdmin/:groupId/:userId', groupCRTL.removeAsAdmin);
router.delete('/removeAsGroup/:groupId/:userId', groupCRTL.removeAsGroup);


module.exports = router