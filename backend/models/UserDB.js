"use strict"

var db = require('../database/connection')
var tbl_user = "`restaurant-review`.user"

class UserDB {
    insertUser(user, callback) {
        delete user._id
        var query = `INSERT INTO ${tbl_user} SET ?`
        db.query(query, user, callback)
    }

    verifyUnique(info, field, callback) {
        var query = `SELECT count(*) as count FROM ${tbl_user} WHERE ${field} = ?`
        db.query(query, info, callback)
    }

    login(username, callback) {
        var query = `SELECT * FROM ${tbl_user} WHERE username = ?`
        db.query(query, username, callback)
    }

    getAvatar(id, callback) {
        var query = `SELECT avatar FROM ${tbl_user} WHERE _id = ?`
        db.query(query, id, callback)
    }

    getAllUsers(callback) {
        var query = `SELECT * FROM ${tbl_user}`
        db.query(query, callback)
    }

    deleteUser(id, callback) {
        var query = `DELETE FROM ${tbl_user} WHERE _id = ?`
        db.query(query, id, callback)
    }

    updateUser(user, callback) {
        delete user.password
        var query = `UPDATE ${tbl_user} SET ? WHERE _id =?;
        SELECT * FROM ${tbl_user} WHERE _id =?`
        db.query(query, [user, user.getId(), user.getId()], callback)
    }
}
module.exports = UserDB