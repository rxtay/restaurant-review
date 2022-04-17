"use-strict"
const db = require('../../database/connection')
var Post = require('../../models/Community/Post')
var PostsDB = require('../../models/Community/PostsDB')
var postsDB = new PostsDB()

tbl_community_post = "`restaurant-review`.community_post"
tbl_likes = "`restaurant-review`.community_likes"
tbl_community_comment = "`restaurant-review`.community_comment"
tbl_user = "`restaurant-review`.user"

// Update post
const updatePost = (req, res) => {
    var post = new Post(parseInt(req.body._id), req.body.image, req.body.title, req.user._id, req.params.community_id)
    postsDB.updatePost(post, function (error, results) {
        res.status(200).json(results[1])
        if (error) throw error;
    })
}

// Delete post
const deletePost = (req, res) => {
    postsDB.deletePost(req.params.id, req.user._id, req.params.community_id, function (error, results) {
        res.status(200).json(results[1])
    })
}

// Insert post
const insertPost = (req, res) => {
    var post = new Post(null, req.body.image, req.body.title, req.body.user_id, req.body.community_id)
    postsDB.insertPost(post, req.user._id, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

const getPosts = (req, res) => {
    postsDB.getPosts(req.params.community_id, req.user._id, function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}


module.exports = {
    insertPost,
    deletePost,
    updatePost,
    getPosts
}