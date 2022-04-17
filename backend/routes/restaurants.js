const express = require('express');
const router = express.Router();

const {
    getAllRestaurants, getRestaurant, deleteRestaurant, updateRestaurant, insertRestaurant
} = require('../controllers/restaurants')

router.route('/').get(getAllRestaurants).post(insertRestaurant)
router.route('/:id').get(getRestaurant).delete(deleteRestaurant).put(updateRestaurant)

module.exports = router