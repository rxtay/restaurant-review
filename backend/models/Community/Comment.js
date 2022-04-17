"use strict"

class Comment {
    constructor(_id, comment, user_id, post_id, community_id) {
        this.comment = comment
        this._id = _id
        this.user_id = user_id
        this.post_id = post_id
        this.community_id = community_id
    }

    getPostId() {
        return this.post_id
    }
    getId() {
        return this._id
    }
    getComment() {
        return this.comment
    }
    getUserId() {
        return this.user_id
    }
    getCommunityId() {
        return this.community_id
    }

    setCommunityId(community_id) {
        this.community_id = community_id
    }
    setComment(comment) {
        this.comment = comment
    }
    setId(_id) {
        this._id = _id
    }
    setUserId(user_id) {
        this.user_id = user_id
    }
    setPostId(post_id) {
        this.post_id = post_id
    }
}

module.exports = Comment