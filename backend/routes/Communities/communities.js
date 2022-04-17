const express = require('express')
const router = express.Router()

const {
    authToken
} = require('../../controllers/users')

const {
    getCommunities,
    insertCommunity,
    updateCommunity,
    deleteCommunity,
    getCommunity
} = require('../../controllers/Communities/communities')

router.route('/:id').put(updateCommunity).delete(deleteCommunity).get(getCommunity)
router.route('/').get(getCommunities).post(insertCommunity)

module.exports = router