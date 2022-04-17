"use strict"

var db = require('../database/connection')
var tbl_comment = "`restaurant-review`.comment"
var tbl_user = "`restaurant-review`.user"

class CommentsDB {
    getAllComments(id, callback) {
        const query = `SELECT c.*, u.username, u.avatar FROM ${tbl_comment} as c 
        LEFT OUTER JOIN ${tbl_user} as u on c.user_id = u._id 
        WHERE c.restaurant_id = ?`
        db.query(query, id, callback)
    }

    deleteComment(id, restaurant_id, callback) {
        const query = `DELETE FROM ${tbl_comment} WHERE _id = ?;
        SELECT c.*, u.username, u.avatar FROM ${tbl_comment} as c LEFT OUTER JOIN 
        ${tbl_user} as u on c.user_id = u._id WHERE c.restaurant_id = ?`
        db.query(query, [id, restaurant_id], callback)
    }

    insertComment(comment, callback) {
        delete comment._id
        const query = `INSERT INTO ${tbl_comment} SET ?;
        SELECT c.*, u.username, u.avatar FROM ${tbl_comment} as c LEFT OUTER JOIN 
        ${tbl_user} as u on c.user_id = u._id WHERE c.restaurant_id = ?`
        db.query(query, [comment, comment.getRestaurantId()], callback)
    }

    updateComment(comment, callback) {
        delete comment.date
        var query = `UPDATE ${tbl_comment} SET ? WHERE _id = ?;
        SELECT c.*, u.username, u.avatar FROM ${tbl_comment} as c 
        LEFT OUTER JOIN ${tbl_user} as u on c.user_id = u._id 
        WHERE c.restaurant_id = ?`
        db.query(query, [comment, comment.getId(), comment.getRestaurantId()], callback)
    }
}
module.exports = CommentsDB
