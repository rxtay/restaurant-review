const router = require('express').Router()

const { forgotPassword, verifyToken, getUser, resetPassword } = require('../controllers/forgot-password')

router.route('/').post(forgotPassword)
router.route('/reset/:id').get(verifyToken, getUser).post(verifyToken, resetPassword)

module.exports = router