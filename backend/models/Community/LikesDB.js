"use strict"

var db = require('../../database/connection')
tbl_likes = "`restaurant-review`.community_likes"
var tbl_community_post = "`restaurant-review`.community_post"

class LikesDB {
    like(like, id, callback) {
        const query = `INSERT INTO ${tbl_likes} SET ?;
        select p.*, if(l.user_id = ?, 1, null) as favorite 
        from ${tbl_community_post} as p 
        left outer join ${tbl_likes} as l 
        on l.post_id = p._id where p.community_id = ?`
        db.query(query, [like, like.getUserId(), id], callback)
    }

    unlike(like, id, callback) {
        const query = `DELETE FROM ${tbl_likes} WHERE user_id = ? AND post_id = ?;
        select p.*, if(l.user_id = ?, 1, null) as favorite 
        from ${tbl_community_post} as p 
        left outer join ${tbl_likes} as l 
        on l.post_id = p._id where p.community_id = ?`
        db.query(query, [like.getUserId(), like.getPostId(), like.getUserId(), id], callback)

    }
}
module.exports = LikesDB
