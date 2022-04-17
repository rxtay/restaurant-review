"use strict"

class Restaurant {
    constructor(_id, name, imageURL, address, description, user_id, hours) {
        this._id = _id
        this.name = name
        this.imageURL = imageURL
        this.address = address
        this.description = description
        this.user_id = user_id
        this.hours = hours
    }

    getId() {
        return this._id
    }
    getName() {
        return this.name
    } 
    getImageURL() {
        return this.imageURL
    }   
    getAddress() {
        return this.address
    }
    getDescription() {
        return this.description
    }
    getUserId() {
        return this.user_id
    }
    getHours() {
        return this.hours
    }
    
    setId(_id) {
        this._id = _id
    }
    setName(name) {
        this.name = name
    }
    setImageURL(imageURL) {
        this.imageURL = imageURL
    }
    setAddress(address) {
        this.address = address
    }
    setDescription(description) {
        this.description = description
    }
    setUserId(user_id) {
        this.user_id = user_id
    }
    setHours(hours) {
        this.hours = hours
    }
}

module.exports = Restaurant