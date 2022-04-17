"use strict"

var db = require('../../database/connection')
tbl_community_comment = "`restaurant-review`.community_comment"
tbl_user = "`restaurant-review`.user"

class CommentsDB {
    getComments(id, callback) {
        const query = `SELECT c.*, u.username FROM ${tbl_community_comment} as c LEFT OUTER JOIN 
        ${tbl_user} as u on c.user_id = u._id WHERE c.community_id = ?`
        db.query(query, id, callback)
    }

    deleteComment(id, community_id, callback) {
        const query = `DELETE FROM ${tbl_community_comment} WHERE _id = ?;
        SELECT c.*, u.username FROM ${tbl_community_comment} as c LEFT OUTER JOIN 
        ${tbl_user} as u on c.user_id = u._id WHERE c.community_id = ?`
        db.query(query, [id, community_id], callback)
    }

    insertComment(comment, callback) {
        delete comment._id
        const query = `INSERT INTO ${tbl_community_comment} SET ?;
        SELECT c.*, u.username FROM ${tbl_community_comment} as c LEFT OUTER JOIN 
        ${tbl_user} as u on c.user_id = u._id WHERE c.community_id = ?`
        db.query(query, [comment, comment.getCommunityId()], callback)
    }

    updateComment(comment, callback) {
        var community_id = comment.community_id
        delete comment.user_id
        delete comment.post_id
        delete comment.community_id
        const query = `UPDATE ${tbl_community_comment} SET ? WHERE _id = ?;
        SELECT c.*, u.username FROM ${tbl_community_comment} as c LEFT OUTER JOIN 
        ${tbl_user} as u on c.user_id = u._id WHERE c.community_id = ?`
        db.query(query, [comment, comment._id, community_id], callback)
    }
}
module.exports = CommentsDB