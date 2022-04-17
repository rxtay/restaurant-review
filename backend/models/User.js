"use strict"

class User {
    constructor(_id, first, last, number, email, username, password, gender, address, avatar) {
        this._id = _id
        this.first = first
        this.last = last
        this.number = number
        this.email = email
        this.username = username
        this.password = password
        this.gender = gender
        this.address = address
        this.avatar = avatar
    }

    getAvatar() {
        return this.avatar
    }

    getId() {
        return this._id
    }
    getFirst() {
        return this.first
    }
    getLast() {
        return this.last
    }
    getNumber() {
        return this.number
    }
    getEmail() {
        return this.email
    }
    getUsername() {
        return this.username
    }
    getPassword() {
        return this.password
    }
    getGender() {
        return this.gender
    }
    getAddress() {
        return this.address
    }

    setId(_id) {
        this._id = _id
    }
    setFirst(first) {
        this.first = first
    }
    setLast(last) {
        this.last = last
    }
    setNumber(number) {
        this.number = number
    }
    setEmail(email) {
        this.email = email
    }
    setUsername(username) {
        this.username = username
    }
    setPassword(password) {
        this.password = password
    }
    setGender(gender) {
        this.gender = gender
    }
    setAddress(address) {
        this.address = address
    }
    setAvatar(avatar) {
        this.avatar = avatar
    }
}

module.exports = User