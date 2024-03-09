var POPULAR = require('../models/popular');
var jwt = require('jsonwebtoken');


exports.sequre = async function (req, res, next) {
    try {

        let token = req.headers.populartoken
        if (!token) {
            throw new Error('Please Send popular Token')
        }

        var decoded = jwt.verify(token, 'DEMO');
        console.log(decoded);

        req.popularID = decoded.id

        let adminCheck = await POPULAR.findById(decoded.id)
        if (!adminCheck) {
            throw new Error('popular Not Found')
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

exports.popularCreate = async function (req, res, next) {
    try {
        let popularData = await POPULAR.create(req.body);

        var token = jwt.sign({ id: popularData._id }, 'DEMO');

        res.status(201).json({
            status: "Success",
            message: "popular created successfully",
            data: popularData,
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

exports.popularFind = async function (req, res, next) {
    try {

        let data = await POPULAR.find()

        res.status(201).json({
            status: "Success",
            message: "popular Find Successfully",
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

exports.popularDelete = async function (req, res, next) {
    try {

        let deleteData = await POPULAR.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('popular Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "popular Delete Successfully",
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

exports.popularUpdate = async function (req, res, next) {
    try {

        let UpdateData = await POPULAR.findByIdAndUpdate(req.params.updateId, req.body)
        if (!UpdateData) {
            throw new Error('popular Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "popular Update Successfully",
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