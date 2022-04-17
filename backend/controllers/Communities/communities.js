"use-strict"
const CommunitiesDB = require('../../models/Community/CommunitiesDB')
const communitiesDB = new CommunitiesDB()
const Community = require('../../models/Community/Community')

// Get all communities
const getCommunities = (req, res) => {
    communitiesDB.getCommunities(function (error, results) {
        res.status(200).json(results)
    })
}

const getCommunity = (req, res) => {
    communitiesDB.getCommunity(req.params.id, function (error, results) {
        res.status(200).json(results)
    })
}

// Insert community
const insertCommunity = (req, res) => {
    var community = new Community(null, req.body.user_id, req.body.name)
    communitiesDB.insertCommunity(community, function (error, results) {
        if (error) throw error
        res.status(200).json(results[1])
    })
}

// Update community
const updateCommunity = (req, res) => {
    var community = new Community(parseInt(req.params.id), null, req.body.name)
    communitiesDB.updateCommunity(community, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

// Delete Community
const deleteCommunity = (req, res) => {
    const msg = [{
        main: "Success!",
        sub: "Community removed successfully."
    }]
    communitiesDB.deleteCommunity(req.params.id, function (error, results) {
        if (error) throw error;
        res.status(200).json(msg)
    })
}

module.exports = {
    getCommunity,
    getCommunities,
    insertCommunity,
    updateCommunity,
    deleteCommunity,

}