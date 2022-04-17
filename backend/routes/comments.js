const router = require('express').Router()

const {
    getAllComments, deleteComment, insertComment, updateComment
} = require('../controllers/comments')

router.route('/:id').get(getAllComments).put(updateComment)
router.route('/').post(insertComment)
router.route('/:restaurant_id/:id').delete(deleteComment)

module.exports = router