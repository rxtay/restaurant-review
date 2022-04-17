"use strict";

var CategoriesDB = require('../models/CategoriesDB')
var categoriesDB = new CategoriesDB()
var Category = require('../models/Category')

//Get all categories
const getAllCategories = (req, res) => {
    categoriesDB.getAllCategories(function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}

//Update specific category
const updateCategory = (req, res) => {
    var category = new Category(parseInt(req.params.id), req.body.category, req.body.imageURL, null)
    categoriesDB.updateCategory(category, function (error, results) {
        if (error) throw error;
        res.status(200).json(true)
    })
}

const deleteCategory = (req, res) => {
    const msg = [{
        msg: {
            main: "Success!",
            sub: "Category deleted successfully."
        }
    }]
    categoriesDB.deleteCategory(req.params.id, function (error, results) {
        if (error) throw error;
        res.status(200).json(msg)
    })
}

//Insert a category
const insertCategory = (req, res) => {
    console.log(req.body)
    var category = new Category(null, req.body.category, req.body.imageURL, req.body.user_id)
    categoriesDB.insertCategory(category, function (error, results) {
        if (error) throw error;
        res.status(200).json(results[1])
    })
}

//Get specific category
const getCategory = (req, res) => {
    categoriesDB.getCategory(req.params.id, function (error, results) {
        if (error) throw error
        res.status(200).json(results)
    })
}

const getFilteredCategory = (req, res) => {
    categoriesDB.getFilteredCategory(req.params.id, req.headers.name, function (error, results) {
        if (error) throw error;
        res.status(200).json(results)
    })
}

module.exports = {
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    insertCategory,
    getFilteredCategory
}
