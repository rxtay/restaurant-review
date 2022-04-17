"use strict"

var db = require('../database/connection')
var tbl_session = "`restaurant-review`.session"

class SessionsDB {
    deleteToken(user_id, callback) {
        var query = `DELETE FROM ${tbl_session} WHERE user_id = ?`
        db.query(query, user_id, callback)
    }

    insertToken(session, callback) {
        const query = `INSERT INTO ${tbl_session} SET ? ON DUPLICATE KEY UPDATE token = ?;
        SELECT token FROM ${tbl_session} WHERE user_id = ?`
        db.query(query, [session, session.getToken(), session.getUserId()], callback)
    }

    verifyToken(session, callback) {
        const query = `SELECT count(*) as count FROM ${tbl_session} WHERE user_id = ? AND token = ?`
        db.query(query, [session.getUserId(), session.getToken()], callback)
    }
}

module.exports = SessionsDB