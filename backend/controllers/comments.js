"use strict";
const db = require('../database/connection')

var tbl_comment = "`restaurant-review`.comment"
var tbl_user = "`restaurant-review`.user"
var CommentsDB = require('../models/CommentsDB')
var commentsDB = new CommentsDB()
var Comment = require('../models/Comment')

//Get all comments for specific restaurants
const getAllComments = (req, res) => {
    commentsDB.getAllComments(req.params.id, function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}

//Delete a specific comment
const deleteComment = (req, res) => {
    commentsDB.deleteComment(req.params.id, req.params.restaurant_id, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

//Insert a comment
const insertComment = (req, res) => {
    var dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Singapore' }).split(',')
    var date = dateTime[0].split('/').reverse().join('-')
    var time = dateTime[1].trim()
    var comment = new Comment(null, req.body.user_id, req.body.comment, req.body.rating, `${date} ${time}`, req.body.restaurant_id)
    commentsDB.insertComment(comment, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

//Update a specific comment
const updateComment = (req, res) => {
    var comment = new Comment(parseInt(req.params.id), req.body.user_id, req.body.comment, req.body.rating, null, req.body.restaurant_id)
    commentsDB.updateComment(comment, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

module.exports = {
    getAllComments,
    updateComment,
    deleteComment,
    insertComment
}