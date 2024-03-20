const fs = require('fs').promises;
var POPULAR = require('../models/popular-Icon');


exports.popularCreate = async function (req, res, next) {
    try {
        let path = req.files.icon[0].path

        let svgData = await fs.readFile(path, 'utf-8');
        svgData = svgData.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');

        req.body.icon = svgData

        const iconData = await POPULAR.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "popular created successfully",
            data: iconData
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

exports.popularFindById = async function (req, res, next) {
    try {
        let data = await POPULAR.findById(req.params.iconId);

        res.status(201).json({
            status: "Success",
            message: "popular Find Successfully",
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

exports.popularFindOne = async function (req, res, next) {
    try {
        let data = await POPULAR.find({ category: req.params.categoryName });

        res.status(201).json({
            status: "Success",
            message: "Category popular Find Successfully",
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
        let path = req.files.icon[0].path

        let svgData = await fs.readFile(path, 'utf-8');
        svgData = svgData.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');

        req.body.icon = svgData

        let updatedData = await POPULAR.findByIdAndUpdate(req.params.updateId, req.body);
        if (!updatedData) {
            throw new Error('popular Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "popular Update Successfully",
            data: updatedData
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}