"use strict"

class Comment {
    constructor(_id, user_id, comment, rating, date, restaurant_id) {
        this._id = _id
        this.user_id = user_id
        this.comment = comment
        this.rating = rating
        this.date = date
        this.restaurant_id = restaurant_id
    }
    getId() {
        return this._id
    }
    getUserId() {
        return this.user_id
    }
    getComment() {
        return this.comment
    }
    getRating() {
        return this.rating
    }
    getDate() {
        return this.date
    }
    getRestaurantId() {
        return this.restaurant_id
    }

    setId(_id) {
        this._id = _id
    }
    setUserId(user_id) {
        this.user_id = user_id
    }
    setComment(comment) {
        this.comment = comment
    }
    setRating(rating) {
        this.rating = rating
    }
    setDate(date) {
        this.date = date
    }
    setRestaurantId(restaurant_id) {
        this.restaurant_id = restaurant_id
    }
}

module.exports = Comment