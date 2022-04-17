"use strict"

class Community {
    constructor(_id, user_id, name) {
        this._id = _id
        this.user_id = user_id
        this.name = name
    }

    getUserId() {
        return this.user_id
    }

    getId() {
        return this._id
    }

    getName() {
        return this.name
    }

    setUserId(user_id) {
        this.user_id = user_id
    }
    setName(name) {
        this.name = name
    }
    setId(_id) {
        this._id = _id
    }
}

module.exports = Community