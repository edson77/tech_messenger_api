const express = require('express')
const authCRTL = require('../controllers/authController')
const multer = require('./../middlewares/multer-config')
const auth = require('../middlewares/auth')


const router = express.Router()

router.post('/phone_register', authCRTL.signUp_by_phone_number)

router.put('/verify_phone_register/:phone',authCRTL.signUp_verify_phone_number);

router.put('/edit_user_register/:phone', multer.single('image'), authCRTL.signUp_edit_username_and_avatar);

module.exports = router