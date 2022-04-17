const router = require('express').Router()

const {
    getRestaurants, getCategories, getCommunities
} = require('../controllers/search')

router.route('/restaurants').get(getRestaurants)
router.route('/categories').get(getCategories)
router.route('/communities').get(getCommunities)

module.exports = router