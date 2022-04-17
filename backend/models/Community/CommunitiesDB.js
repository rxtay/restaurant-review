"use strict"

var db = require('../../database/connection')
var tbl_community = "`restaurant-review`.community"
var tbl_community_post = "`restaurant-review`.community_post"
var tbl_community_comment = "`restaurant-review`.community_comment"
var tbl_likes = "`restaurant-review`.community_likes"
var tbl_user = "`restaurant-review`.user"

class CommunitiesDB {
    getCommunities(callback) {
        const query = `SELECT * FROM ${tbl_community}`
        db.query(query, callback)
    }

    getCommunity(id, callback) {
        const query = `SELECT * FROM ${tbl_community} WHERE _id = ?`
        db.query(query, id, callback)
    }

    insertCommunity(community, callback) {
        delete community._id
        const query = `INSERT INTO ${tbl_community} SET ?;
        SELECT * FROM ${tbl_community}`
        db.query(query, community, callback)
    }

    updateCommunity(community, callback) {
        delete community.user_id
        const query = `UPDATE ${tbl_community} SET ? WHERE _id =?;
        SELECT * FROM ${tbl_community} WHERE _id =?`;
        db.query(query, [community, community.getId(), community.getId()], callback)

    }

    deleteCommunity(id, callback) {
        const query = `DELETE FROM ${tbl_community} WHERE _id = ?`
        db.query(query, id, callback)
    }
}

module.exports = CommunitiesDB