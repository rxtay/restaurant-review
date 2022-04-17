"use strict";
var db = require('../database/connection')
var RestaurantsDB = require('../models/RestaurantsDB')
var restaurantsDB = new RestaurantsDB()
var Restaurant = require('../models/Restaurant')

//Get all restaurants
const getAllRestaurants = (req, res) => {
    restaurantsDB.getAllRestaurants(function (error, results) {
        if (error) throw error;
        res.status(200).json(results)
    });
}

//Get specific restaurant
const getRestaurant = (req, res) => {
    restaurantsDB.getRestaurant(req.params.id, function (error, results) {
        if (error) throw error;
        res.status(200).json(results)
    })
}

//Update a specific restaurant
const updateRestaurant = (req, res) => {
    var restaurant = new Restaurant(parseInt(req.params.id), req.body.name, req.body.imageURL, req.body.address, req.body.description, req.body.user_id, req.body.hours)
    restaurantsDB.updateRestaurant(restaurant, function (error, results) {
        if (error) throw error
        res.status(200).json(results[1])
    })
}

//Delete a specific restaurant
const deleteRestaurant = (req, res) => {
    const msg = [{
        msg: {
            type: 'success',
            main: "Success!",
            sub: "Restaurant record deleted successfully."
        }
    }]
    restaurantsDB.deleteRestaurant(req.params.id, function (error, result, fields) {
        if (error) throw error;
        res.status(200).json(msg)
    })
}

//Insert A restaurant
const insertRestaurant = (req, res) => {
    var restaurant = new Restaurant(null, req.body.name, req.body.imageURL, req.body.address, req.body.description, req.body.user_id, req.body.hours)
    restaurantsDB.insertRestaurant(restaurant, function (error, results) {
        if (error) throw error
        res.status(200).json(results[1])
    })
}

module.exports = {
    getAllRestaurants,
    getRestaurant,
    deleteRestaurant,
    updateRestaurant,
    insertRestaurant
}