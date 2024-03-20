var POPCATEGORY = require('../models/pop-category');


exports.popCategoryCreate = async function (req, res, next) {
    try {
        let popCategoryData = await POPCATEGORY.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "popular Category created successfully",
            data: popCategoryData
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.popCategoryFind = async function (req, res, next) {
    try {

        let data = await POPCATEGORY.find()

        res.status(201).json({
            status: "Success",
            message: "popCategory Find Successfully",
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

exports.popCategoryFindOne = async function (req, res, next) {
    try {
        let data = await POPCATEGORY.find({ card: req.params.cardName });

        res.status(201).json({
            status: "Success",
            message: "popular Category Find By Card Name Successfully",
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

exports.popCategoryDelete = async function (req, res, next) {
    try {

        let deleteData = await POPCATEGORY.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('popCategory Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "popCategory Delete Successfully",
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

exports.popCategoryUpdate = async function (req, res, next) {
    try {

        let UpdateData = await POPCATEGORY.findByIdAndUpdate(req.params.updateId, req.body)
        if (!UpdateData) {
            throw new Error('popCategory Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "popCategory Update Successfully",
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