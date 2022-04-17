const express = require('express')
const router = express.Router()

const {
    insertPost,
    deletePost,
    updatePost,
    getPosts
} = require('../../controllers/Communities/posts')

const {
    authToken
} = require('../../controllers/users')

router.route('/').post(authToken, insertPost)
router.route('/:community_id').put(authToken, updatePost).get(authToken, getPosts)
router.route('/:community_id/:id').delete(authToken, deletePost)

module.exports = router