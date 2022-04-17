const express = require('express')
const router = express.Router()

const {
    authToken
} = require('../../controllers/users')

const {
    like_post, unlike_post
} = require('../../controllers/Communities/likes')

router.route('/:id/:post_id').post(authToken, like_post).delete(authToken, unlike_post)
module.exports = router