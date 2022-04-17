"use strict"
var db = require('../database/connection')
var RestaurantsCategoriesDB = require('../models/RestaurantsCategoriesDB')
var restaurantsCategoriesDB = new RestaurantsCategoriesDB()

const manageCategory = (req, res) => {
    restaurantsCategoriesDB.manageCategory(req.params.id, function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}

const addToCategory = (req, res) => {
    restaurantsCategoriesDB.addToCategory({
        restaurant_id: req.body.restaurant_id,
        category_id: req.params.id
    }, function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}

const removeFromCategory = (req, res) => {
    restaurantsCategoriesDB.removeFromCategory(req.params, function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}

module.exports = {
    manageCategory,
    removeFromCategory,
    addToCategory
}