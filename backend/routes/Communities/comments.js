const express = require('express')
const router = express.Router()

const {
    getComments,
    updateComment,
    insertComment,
    deleteComment
} = require('../../controllers/Communities/comments')

router.route('/').post(insertComment)
router.route('/:community_id').put(updateComment).get(getComments)
router.route('/:community_id/:id').delete(deleteComment)
module.exports = router