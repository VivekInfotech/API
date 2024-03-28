var SAVE = require('../models/save');

exports.saveCreate = async function (req, res, next) {
    try {
        let saveData = await SAVE.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "save created successfully",
            data: saveData
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.saveFind = async function (req, res, next) {
    try {

        let data = await SAVE.find()

        res.status(201).json({
            status: "Success",
            message: "save Find Successfully",
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

exports.saveDelete = async function (req, res, next) {
    try {

        let deleteData = await SAVE.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('save Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "save Delete Successfully",
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

exports.saveUpdate = async function (req, res, next) {
    try {

        let UpdateData = await SAVE.findByIdAndUpdate(req.params.updateId, req.body)
        if (!UpdateData) {
            throw new Error('save Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "save Update Successfully",
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