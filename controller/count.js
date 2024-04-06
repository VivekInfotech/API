const fs = require('fs').promises;
const COUNT = require('../models/count');
const ICON = require('../models/icon');
const ANIMATED = require('../models/animated');
const INTERFACE = require('../models/interface');
const CATEGORY = require('../models/category');
const POPCATEGORY = require('../models/pop-category');
const POPULAR = require('../models/popular-Icon');


exports.countCreate = async function (req, res, next) {
    try {
        let icon = await ICON.find()
        let animated = await ANIMATED.find()
        let interface = await INTERFACE.find()
        let category = await CATEGORY.find()
        let popcategory = await POPCATEGORY.find()
        let popular = await POPULAR.find()

        req.body.icon = icon.length
        req.body.animated = animated.length
        req.body.interface = interface.length
        req.body.category = category.length
        req.body.popcategory = popcategory.length
        req.body.popular = popular.length

        
        req.body.total = await icon.length + animated.length + interface.length + popular.length
        req.body.totalCat = await category.length + popcategory.length
        console.log(req.body.total,req.body.totalCat);

        let countData = await COUNT.create(req.body)
        
        res.status(201).json({
            status: "Success",
            message: "count created successfully",
            data: countData
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}

exports.countFind = async function (req, res, next) {
    try {

        let data = await COUNT.find()

        res.status(201).json({
            status: "Success",
            message: "count Find Successfully",
            data
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.countFindOne = async function (req, res, next) {
    try {
        let data = await COUNT.find({ category: req.params.categoryName });

        res.status(201).json({
            status: "Success",
            message: "Category count Find Successfully",
            data
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}

exports.countDelete = async function (req, res, next) {
    try {

        let deleteData = await COUNT.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('count Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "count Delete Successfully",
            data: deleteData
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.countUpdate = async function (req, res, next) {
    try {
        let icon = await ICON.find()
        let animated = await ANIMATED.find()
        let interface = await INTERFACE.find()
        let category = await CATEGORY.find()
        let popcategory = await POPCATEGORY.find()
        let popular = await POPULAR.find()

        req.body.icon = icon.length
        req.body.animated = animated.length
        req.body.interface = interface.length
        req.body.category = category.length
        req.body.popcategory = popcategory.length
        req.body.popular = popular.length

        
        req.body.total = await icon.length + animated.length + interface.length + popular.length
        req.body.totalCat = await category.length + popcategory.length
        console.log(req.body.total,req.body.totalCat);

        let updatedcount = await COUNT.findByIdAndUpdate(req.params.updateId,req.body)

        res.status(200).json({
            status: "Success",
            message: "count Updated Successfully",
            data: updatedcount
        });
    }
    catch (error) {
        // Send error response
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}
