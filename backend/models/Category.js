"use strict"

class Category {
    constructor(_id, category, imageURL, user_id) {
        this._id = _id
        this.category = category
        this.imageURL = imageURL
        this.user_id = user_id
    }

    getId() {
        return this._id
    }
    getCategory() {
        return this.category
    }
    getImageURL() {
        return this.imageURL
    }
    getUserId() {
        return this.user_id
    }

    setId(_id) {
        this._id = _id
    }
    setCategory(category) {
        this.category = category
    }
    setImageURL(imageURL) {
        this.imageURL = imageURL
    }
    setUserId(user_id) {
        this.user_id = user_id
    }
}

module.exports = Category