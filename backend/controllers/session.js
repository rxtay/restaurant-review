"use strict";

var SessionsDB = require('../models/SessionsDB')
var sessionDB = new SessionsDB()
var Session = require('../models/Session')

// Logout
const deleteToken = (req, res) => {
    sessionDB.deleteToken(req.user._id, function(error, results){
        if (error) throw error;
        res.status(200).clearCookie('sessionToken').send(true)
    })
}

// Login
const insertToken = (req, res) => {
    var session = new Session(req.user._id, Date.now().toString()+Math.random().toString())
    sessionDB.insertToken(session, function(error, results){
        if (error) throw error
        res.status(200).cookie('sessionToken', session.getToken()).json(null)
    })
}

// Verify
const verifyToken = (req, res) => {
    var session = new Session(req.user._id, req.params.id)
    sessionDB.verifyToken(session, function(error, results){
        if (error) throw error
        if (results[0].count === 1) {
            res.status(200).send(true)
        } else {
            res.status(403).send(false)
        }
    })
}

module.exports = {
    insertToken,
    deleteToken,
    verifyToken
}