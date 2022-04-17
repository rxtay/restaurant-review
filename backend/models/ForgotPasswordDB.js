"use strict"

var db = require('../database/connection')
var tbl_user = "`restaurant-review`.user"

class ForgotPasswordDB {
    forgotPassword(email, callback) {
        const query = `SELECT count(*) as count, _id, username, email FROM ${tbl_user} WHERE email = ?`
        db.query(query, email, callback)
    }
    resetPassword(password, user_id, callback) {
        const query = `UPDATE ${tbl_user} SET ? WHERE _id = ?`
        db.query(query, [password, user_id], callback)
    }

}
module.exports = ForgotPasswordDB
