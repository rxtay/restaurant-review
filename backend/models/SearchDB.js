"use strict"

var db = require('../database/connection')
var tbl_restaurant = "`restaurant-review`.restaurant"
var tbl_category = "`restaurant-review`.category"
var tbl_community = "`restaurant-review`.community"

class SearchDB {
    getRestaurants(name, callback) {
        var query = `SELECT _id, name, imageURL FROM ${tbl_restaurant} WHERE name LIKE '%${name}%'`
        db.query(query, callback)
    }

    getCategories(name, callback) {
        var query = `SELECT _id, category, imageURL FROM ${tbl_category} WHERE category LIKE '%${name}%'`
        db.query(query, callback)
    }

    getCommunities(name, callback) {
        var query = `SELECT _id, name FROM ${tbl_community} WHERE name LIKE '%${name}%'`
        db.query(query, callback)
    }
}

module.exports = SearchDB