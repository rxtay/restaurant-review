"use strict"

class Post {
    constructor(_id, image, title, user_id, community_id) {
        this._id = _id
        this.image = image
        this.title = title
        this.user_id = user_id
        this.community_id = community_id
    }

    getId() {
        return this._id
    }

    getImage() {
        return this.image
    }

    getTitle() {
        return this.title
    }

    getUserId() {
        return this.user_id
    }

    getCommunityId() {
        return this.community_id
    }

    setId(_id) {
        this._id = _id
    }

    setImage(image) {
        this.image = image
    }

    setTitle(title) {
        this.title = title
    }

    setUserId(user_id) {
        this.user_id = user_id
    }

    setCommunityId(community_id) {
        this.community_id = community_id
    }
}

module.exports = Post