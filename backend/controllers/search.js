"use strict";

var SearchDB = require('../models/SearchDB')
var searchDB = new SearchDB()

const getRestaurants = (req, res) => {
    searchDB.getRestaurants(req.headers.name, function(error, results){
        if (error) throw error
        res.status(200).json(results)
    })
}

const getCategories = (req, res) => {
    searchDB.getCategories(req.headers.name, function(error, results){
        if(error) throw error
        res.status(200).json(results)
    })
}

const getCommunities = (req, res) => {
    searchDB.getCommunities(req.headers.name, function(error, results){
        if (error) throw error;
        res.status(200).json(results)
    })
}

module.exports = {
    getRestaurants,
    getCategories,
    getCommunities
}