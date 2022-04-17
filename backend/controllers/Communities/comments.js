"use-strict"
var CommentsDB = require('../../models/Community/CommentsDB')
var commentsDB = new CommentsDB()
var Comment = require('../../models/Community/Comment')

tbl_community_comment = "`restaurant-review`.community_comment"
tbl_user = "`restaurant-review`.user"

const getComments = (req, res) => {
    commentsDB.getComments(req.params.community_id, function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}

//Delete a specific comment
const deleteComment = (req, res) => {
    commentsDB.deleteComment(req.params.id, req.params.community_id, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

const insertComment = (req, res) => {
    var comment = new Comment(null, req.body.comment, req.body.user_id, req.body.post_id, req.body.community_id)
    commentsDB.insertComment(comment, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

const updateComment = (req, res) => {
    var comment = new Comment(req.body._id, req.body.comment, null, null, req.params.community_id)
    commentsDB.updateComment(comment, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

module.exports = {
    insertComment,
    getComments,
    updateComment,
    deleteComment
}