const express = require('express');
const router = express.Router();

const {
    getCategory, updateCategory, deleteCategory, getAllCategories, insertCategory, getFilteredCategory,
} = require('../controllers/categories')

router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)
router.route('/').get(getAllCategories).post(insertCategory)
router.route('/filtered/:id').get(getFilteredCategory)

module.exports = router