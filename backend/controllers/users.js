"use strict";
const db = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var tbl_user = "`restaurant-review`.user"
var UserDB = require('../models/UserDB')
var userDB = new UserDB()
var User = require('../models/User')

//Insert user; Using bcrypt to create hashed password
const insertUser = async (req, res) => {
    try {
        const hashedKey = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedKey
        var user = new User(null, req.body.first, req.body.last, req.body.number, req.body.email, req.body.username, req.body.password, req.body.gender, req.body.address, null)
        userDB.insertUser(user, function (error, results) {
            const msg = [{
                msg: {
                    main: "Success!",
                    sub: "Redirecting to Login",
                    type: "success"
                }
            }]
            if (error) throw error;
            res.status(200).json(msg)
        })
    } catch {
        res.status(500).json(
            [{
                msg: {
                    type: "warning",
                    main: "Oops!",
                    sub: "Failed to register user. Please try again."
                }
            }])
    }
}

//Validate the phone no.
const validateNumber = (req, res, next) => {
    var regex = /^[89]+[0-9]{7}$/;
    //If the phone does not match the regex, return false
    if (regex.test(req.body.number)) {
        next()
    } else {
        return res.status(403).json(
            [{
                msg: {
                    type: "warning",
                    sub: "Please enter a valid mobile number."
                }
            }]
        )
    }
}

const uniqueEmail = (req, res, next) => {
    userDB.verifyUnique(req.body.email, 'email', function (error, results) {
        if (results[0].count === 0) {
            next()
        } else {
            return res.status(403).json(
                [{
                    msg: {
                        type: "warning",
                        sub: "A user with this email address already exists."
                    }
                }]
            )
        }
    })
}

const uniqueUsername = (req, res, next) => {
    userDB.verifyUnique(req.body.username, 'username', function (error, results) {
        if (results[0].count === 0) {
            next()
        } else {
            return res.status(403).json(
                [{
                    msg: {
                        type: "warning",
                        sub: "A user with this username already exists."
                    }
                }]
            )
        }
    })
}

const login = (req, res) => {
    userDB.login(req.body.username, async (error, results) => {
        if (error) throw error
        if (results[0] !== null) {
            try {
                if (await bcrypt.compare(req.body.password, results[0].password)) {
                    delete results[0].password
                    delete results[0].avatar
                    jwt.sign(JSON.stringify(results[0]), process.env.ACCESS_TOKEN_SECRET, (err, token) => {
                        res.status(200).cookie('token', token, {
                            expires: new Date(Date.now() + 900000),
                            httpOnly: true,
                            secure: true,
                            path: '/'
                        }).json([{
                            msg: {
                                type: 'success',
                                main: 'Login Successful!',
                                sub: `Welcome to Plain Jane, ${results[0].username}.`,
                            },
                            _id: results[0]._id
                        }])
                    })
                } else {
                    res.status(403).json([{
                        msg: {
                            type: 'warning', main: 'Login Failed!',
                            sub: 'Either the username or password is incorrect.'
                        }
                    }])
                }
            } catch {
                res.status(403).json([{
                    msg: {
                        type: 'warning', main: 'Login Failed!',
                        sub: 'User not found.'
                    }
                }])
            }
        }
    })
}

//Get user
const getUser = (req, res) => {
    userDB.getAvatar(req.user._id, function (err, results) {
        if (err) throw err;
        res.status(200).json({ ...req.user, avatar: results[0].avatar })
    })
}

function authToken(req, res, next) {
    const msg = [{
        msg: {
            main: "Oops!",
            sub: "Failed to authenticate user."
        }
    }]

    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    const token = req.cookies.token
    if (token === null) return res.status(401).json(msg)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json(msg)
        req.user = decoded;
        next()
    })
}

//Get all users
const getAllUsers = (req, res) => {
    userDB.getAllUsers(function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}

//Delete user
const deleteUser = (req, res) => {
    userDB.deleteUser(req.params.id, function (error, results) {
        if (error) throw error;
        else {
            const msg = [{
                msg: {
                    main: "Success!",
                    sub: "User deleted successfully.",
                    type: "success"
                }
            }]
            res.status(200).clearCookie('token').clearCookie('sessionToken').json(msg)
        }
    })
}

//Update user
const updateUser = (req, res) => {
    var user = new User(parseInt(req.params.id), req.body.first, req.body.last, req.body.number, req.body.email, req.body.username, null, req.body.gender, req.body.address, req.body.avatar)
    const msg = [{
        msg: {
            main: "Success!",
            sub: "User updated successfully.",
            type: "success"
        }
    }]
    userDB.updateUser(user, function (error, results) {
        if (error) throw error;
        if (results[1][0] !== null) {
            jwt.sign(JSON.stringify(results[1][0]), process.env.ACCESS_TOKEN_SECRET, (err, token) => {
                res.status(200).cookie('token', token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                    secure: true,
                    path: '/'
                }).json(msg)
            })
        }
    })
}

module.exports = {
    getAllUsers,
    login,
    getUser,
    deleteUser,
    updateUser,
    insertUser,
    authToken,
    validateNumber,
    uniqueEmail,
    uniqueUsername
}