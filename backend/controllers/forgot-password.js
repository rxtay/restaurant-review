"use strict";
const jwt = require('jsonwebtoken');
var tbl_user = "`restaurant-review`.user"
const db = require('../database/connection');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
var ForgotPasswordDB = require('../models/ForgotPasswordDB')
var forgotPasswordDB = new ForgotPasswordDB()

const forgotPassword = (req, res) => {
    forgotPasswordDB.forgotPassword(req.body.email, function (err, results) {
        if (err) throw err
        if (results[0].count === 1) {
            delete results[0].count
            jwt.sign({ payload: results[0] }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' }, (err, token) => {
                sendEmail(res, results[0], token)
            })
        } else {
            res.status(403).json({
                type: 'warning',
                sub: 'User not found.',
                main: 'Warning!'
            })
        }
    })
}

function sendEmail(res, data, token) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'example@mail.com',
            pass: 'example'
        }
    });

    var mailOptions = {
        from: 'example@mail.com',
        to: data.email,
        subject: 'Reset your password',
        text: `Hi ${data.username}, 
You requested to reset the password for your account with the e-mail address (${data.email}). 
Please click this link to reset your password.
http://localhost:3000/forgot-password/reset/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({
                type: 'success',
                sub: 'Please check your email to reset your password.',
                main: 'Success!'
            })
            console.log(`Email Sent: ${info.response}`);
        }
    });
}

const getUser = (req, res) => {
    res.status(200).json(true)
}

function verifyToken(req, res, next) {
    jwt.verify(req.params.id, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({
            type: 'warning',
            main: 'Invalid or Expired link',
            sub: 'Sorry, your password reset link is no longer valid.'
        })
        req.user = decoded
        next()
    })
}

const resetPassword = async (req, res) => {
    console.log(req.body, req.user.payload)
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        forgotPasswordDB.resetPassword(req.body, req.user.payload._id, function (err, results) {
            if (err) throw err
            res.status(200).json({
                type: 'success',
                main: 'Password reset successful',
                sub: "Awesome, you've successfully updated your password."
            })
        })
    } catch {
        res.status(500).json({
            type: 'warning',
            main: 'An error occurred.',
            sub: 'Please try again later.'
        })
    }
}


module.exports = {
    forgotPassword,
    verifyToken,
    getUser,
    resetPassword
}