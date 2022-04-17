"use strict"

var db = require('../../database/connection')
var tbl_community_post = "`restaurant-review`.community_post"
var tbl_likes = "`restaurant-review`.community_likes"

class PostsDB {
    getPosts(id, user_id, callback) {
        const query = `select if (l.user_id = ?, 1, null) as favorite, p.* from ${tbl_community_post} as p 
        left outer join ${tbl_likes} as l on l.post_id = p._id where p.community_id = ?`
        db.query(query, [user_id, id], callback)
    }

    updatePost(post, callback) {
        const query = `UPDATE ${tbl_community_post} SET ? WHERE _id = ?;
        select p.*, if(l.user_id = ?, 1, null) as favorite from ${tbl_community_post} as p 
        left outer join ${tbl_likes} as l on l.post_id = p._id where p.community_id = ?`
        db.query(query, [post, post.getId(), post.getUserId(), post.getCommunityId()], callback)
    }

    deletePost(id, user_id, community_id, callback) {
        const query = `DELETE FROM ${tbl_community_post} WHERE _id = ?;
        select p.*, if(l.user_id = ?, 1, null) as favorite from ${tbl_community_post} as p 
        left outer join ${tbl_likes} as l on l.post_id = p._id where p.community_id = ?`
        db.query(query, [id, user_id, community_id], callback)
    }

    insertPost(post, user_id, callback) {
        delete post._id
        const query = `INSERT INTO ${tbl_community_post} SET ?;
        select p.*, if(l.user_id = ?, 1, null) as favorite 
        from ${tbl_community_post} as p 
        left outer join ${tbl_likes} as l 
        on l.post_id = p._id where p.community_id = ?`
        db.query(query, [post, user_id, post.getCommunityId()], callback)
    }
}
module.exports = PostsDB