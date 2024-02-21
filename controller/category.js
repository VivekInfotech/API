var CATEGORY = require('../models/category');
var jwt = require('jsonwebtoken');


exports.sequre = async function (req, res, next) {
    try {

        let token = req.headers.categorytoken
        if (!token) {
            throw new Error('Please Send Category Token')
        }

        var decoded = jwt.verify(token, 'DEMO');
        console.log(decoded);

        req.categoryID = decoded.id

        let adminCheck = await CATEGORY.findById(decoded.id)
        if (!adminCheck) {
            throw new Error('category Not Found')
        }

        next()
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.categoryCreate = async function (req, res, next) {
    try {
        let categoryData = await CATEGORY.create(req.body);

        var token = jwt.sign({ id: categoryData._id }, 'DEMO');

        res.status(201).json({
            status: "Success",
            message: "category created successfully",
            data: categoryData,
            token
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.categoryFind = async function (req, res, next) {
    try {

        let data = await CATEGORY.find()

        res.status(201).json({
            status: "Success",
            message: "category Find Successfully",
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

exports.categoryDelete = async function (req, res, next) {
    try {

        let deleteData = await CATEGORY.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('category Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "category Delete Successfully",
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

exports.categoryUpdate = async function (req, res, next) {
    try {

        let UpdateData = await CATEGORY.findByIdAndUpdate(req.params.updateId, req.body)
        if (!UpdateData) {
            throw new Error('category Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "category Update Successfully",
            data: UpdateData
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}