"use strict"

class Session {
    constructor(user_id, token) {
        this.user_id = user_id
        this.token = token
    }

    getUserId() {
        return this.user_id
    }
    getToken() {
        return this.token
    }

    setToken(token) {
        this.token = token
    }
    setUserId(user_id) {
        this.user_id = user_id
    }  
}

module.exports = Session