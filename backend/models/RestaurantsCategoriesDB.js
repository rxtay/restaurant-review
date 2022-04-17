"use strict"

var db = require('../database/connection')
var tbl_restaurant = "`restaurant-review`.restaurant"
var tbl_category = "`restaurant-review`.category"
var tbl_restaurant_category = "`restaurant-review`.restaurant_category"

class RestaurantsCategoriesDB {
    manageCategory(id, callback) {
        const query = `SELECT category as name FROM${tbl_category} WHERE _id = ?;
        select _id, name, null as category from ${tbl_restaurant} 
        where _id not in (select restaurant_id from ${tbl_restaurant_category} 
        where category_id = ?) union all
        select _id, name, True as category from ${tbl_restaurant} 
        where _id in (select restaurant_id from ${tbl_restaurant_category} where category_id =?)`
        db.query(query, [id, id, id], callback)
    }
    addToCategory(obj, callback) {
        var query = `INSERT INTO ${tbl_restaurant_category} SET ?;
        select _id, name, null as category from ${tbl_restaurant} 
        where _id not in (select restaurant_id from ${tbl_restaurant_category} 
        where category_id = ?) union all
        select _id, name, True as category from ${tbl_restaurant} 
        where _id in (select restaurant_id from ${tbl_restaurant_category} where category_id =?)`
        db.query(query, [obj, obj.category_id, obj.category_id], callback)
    }
    removeFromCategory(params, callback) {
        const query = `DELETE FROM ${tbl_restaurant_category} WHERE restaurant_id = ? AND category_id = ?;
        select _id, name, null as category from ${tbl_restaurant} 
        where _id not in (select restaurant_id from ${tbl_restaurant_category} 
        where category_id = ?) union all
        select _id, name, True as category from ${tbl_restaurant} 
        where _id in (select restaurant_id from ${tbl_restaurant_category} where category_id =?)`
        db.query(query, [params.restaurant_id, params.category_id, params.category_id, params.category_id], callback)
    }
}

module.exports = RestaurantsCategoriesDB
