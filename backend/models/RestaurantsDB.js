"use strict"

var db = require('../database/connection')
var tbl_restaurant = "`restaurant-review`.restaurant"
var tbl_category = "`restaurant-review`.category"
var tbl_restaurant_category = "`restaurant-review`.restaurant_category"

class RestaurantsDB {
    getAllRestaurants(callback) {
        var sql = `SELECT _id, name, imageURL FROM ${tbl_restaurant}`
        db.query(sql, callback)
    }

    getRestaurant(id, callback) {
        var query = `select group_concat(c.category order by c.category asc separator ', ') as category, r.* from ${tbl_restaurant} as r 
        left outer join ${tbl_restaurant_category} as b on b.restaurant_id = r._id 
        left outer join ${tbl_category} as c on c._id = b.category_id where r._id = ?`
        db.query(query, id, callback)
    }

    deleteRestaurant(id, callback) {
        var query = `DELETE FROM ${tbl_restaurant} WHERE _id = ?`
        db.query(query, id, callback)
    }

    insertRestaurant(restaurant, callback) {
        delete restaurant._id
        var query = `INSERT INTO ${tbl_restaurant} SET ?;
        SELECT _id, name, imageURL FROM ${tbl_restaurant}`
        db.query(query, restaurant, callback)
    }

    updateRestaurant(restaurant, callback) {
        var query = `UPDATE ${tbl_restaurant} SET ? WHERE _id =?;
        select group_concat(c.category order by c.category asc separator ', ') as category, r.* from ${tbl_restaurant} as r 
        left outer join ${tbl_restaurant_category} as b on b.restaurant_id = r._id 
        left outer join ${tbl_category} as c on c._id = b.category_id where r._id = ?`
        db.query(query, [restaurant, restaurant.getId(), restaurant.getId()], callback)
    }
}

module.exports = RestaurantsDB