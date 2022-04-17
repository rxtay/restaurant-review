const router = require('express').Router()

const {
    getAllUsers, login, updateUser, deleteUser, insertUser, authToken, getUser, validateNumber, uniqueEmail, uniqueUsername
} = require('../controllers/users')

router.route('/').get(getAllUsers).post(validateNumber, uniqueEmail, uniqueUsername, insertUser)

//Update user info / Delete user
router.route('/:id').put(updateUser).delete(deleteUser)

//User Login
router.route('/login').post(login)

//Authenticate user
router.route('/auth').get(authToken, getUser)

module.exports = router