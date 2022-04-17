"use strict"

var db = require('../database/connection')
var tbl_category = "`restaurant-review`.category"
var tbl_restaurant = "`restaurant-review`.restaurant"
var tbl_restaurant_category = "`restaurant-review`.restaurant_category"

class CategoriesDB {
    getAllCategories(callback) {
        var query = `SELECT _id, category, imageURL FROM ${tbl_category}`
        db.query(query, callback)
    }

    deleteCategory(id, callback) {
        var query = `DELETE FROM ${tbl_category} WHERE _id = ?`
        db.query(query, id, callback)
    }

    insertCategory(category, callback) {
        delete category._id
        const query = `INSERT INTO ${tbl_category} SET ?;
        SELECT * FROM ${tbl_category}`
        db.query(query, category, callback)
    }

    updateCategory(category, callback) {
        delete category.user_id
        const query = `UPDATE ${tbl_category} SET ? WHERE _id =?`
        db.query(query, [category, category.getId()], callback)
    }

    getCategory(id, callback) {
        const query = `SELECT _id, category, imageURL FROM ${tbl_category} WHERE _id = ?;
        SELECT b._id, b.name, b.imageURL FROM ${tbl_restaurant_category} 
        AS a left outer join ${tbl_restaurant} as b on a.restaurant_id = b._id where a.category_id = ?`
        db.query(query, [id, id], callback)
    }

    getFilteredCategory(id, name, callback) {
        const query = `select r._id, r.name, r.imageURL from ${tbl_restaurant} as r 
        left outer join ${tbl_restaurant_category} as c on c.restaurant_id = r._id 
        where r.name like '%${name}%' and c.category_id = ?`
        db.query(query, id, callback)
    }
}

module.exports = CategoriesDB
