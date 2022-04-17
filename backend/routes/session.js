const router = require('express').Router()

const {
    insertToken, deleteToken, verifyToken
} = require('../controllers/session')

const {
    authToken
} = require('../controllers/users')

router.route('/').post(authToken, insertToken).delete(authToken, deleteToken)
router.route('/:id').get(authToken, verifyToken)

module.exports = router