"use strict"

class Like {
    constructor(user_id, post_id) {
        this.user_id = user_id
        this.post_id = post_id
    }

    getUserId() {
        return this.user_id
    }
    getPostId() {
        return this.post_id
    }

    setUserId(user_id) {
        this.user_id = user_id
    }

    setPostId(post_id) {
        this.post_id = post_id
    }
}
module.exports = Like