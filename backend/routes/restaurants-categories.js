const express = require('express')
const router = express.Router()

const {
    manageCategory, removeFromCategory, addToCategory
} = require('../controllers/restaurants-categories')

router.route('/:id').get(manageCategory).post(addToCategory)
router.route('/:category_id/:restaurant_id').delete(removeFromCategory)

module.exports = router