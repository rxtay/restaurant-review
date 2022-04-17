"use-strict"
const db = require('../../database/connection')
var Like = require('../../models/Community/Like')
var LikesDB = require('../../models/Community/LikesDB')
var likesDB = new LikesDB()

tbl_likes = "`restaurant-review`.community_likes"

const like_post = (req, res) => {
    var like = new Like(req.user._id, req.params.post_id)
    likesDB.like(like, req.params.id, function (error, results) {
        if (error) throw error
        res.status(200).json(results[1])
    })
}

const unlike_post = (req, res) => {
    var like = new Like(req.user._id, req.params.post_id)
    likesDB.unlike(like, req.params.id, function (error, results) {
        res.status(200).json(results[1])
    })
}

module.exports = {
    like_post,
    unlike_post
}