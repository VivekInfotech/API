const fs = require('fs').promises;
const ICON = require('../models/icon');


exports.iconCreate = async function (req, res, next) {
    try {
        const paths = {
            regular: req.files.regular[0].path,
            bold: req.files.bold[0].path,
            thin: req.files.thin[0].path,
            solid: req.files.solid[0].path,
            straight: req.files.straight ? req.files.straight[0].path : '', // Check if req.files.straight exists
            rounded: req.files.rounded[0].path
        };

        const encodedFiles = await Promise.all(Object.values(paths).map(async (filePath) => {
            let svgData = await fs.readFile(filePath, 'utf-8');
            svgData = svgData.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
            return svgData;
        }));

        const imgTags = Object.keys(paths).map((key, index) => {
            return encodedFiles[index]
        });

        const iconData = await ICON.create({
            name: req.body.name,
            tag: req.body.tag,
            category: req.body.category,
            regular: imgTags[0],
            bold: imgTags[1],
            thin: imgTags[2],
            solid: imgTags[3],
            straight: imgTags[4],
            rounded: imgTags[5]
        });

        res.status(201).json({
            status: "Success",
            message: "Icon created successfully",
            data: iconData
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}

exports.iconFind = async function (req, res, next) {
    try {

        let data = await ICON.find()

        console.log(data[0].regular);

        res.status(201).json({
            status: "Success",
            message: "Icon Find Successfully",
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

exports.iconFindById = async function (req, res, next) {
    try {
        let data = await ICON.findById(req.params.iconId);

        res.status(201).json({
            status: "Success",
            message: "Icon Find Successfully",
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

exports.iconFindOne = async function (req, res, next) {
    try {
        let data = await ICON.find({ category: req.params.categoryName });

        res.status(201).json({
            status: "Success",
            message: "Category Icon Find Successfully",
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

exports.iconDelete = async function (req, res, next) {
    try {

        let deleteData = await ICON.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('Icon Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "Icon Delete Successfully",
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

exports.iconUpdate = async function (req, res, next) {
    try {
        const paths = {
            regular: req.files.regular[0].path,
            bold: req.files.bold[0].path,
            thin: req.files.thin[0].path,
            solid: req.files.solid[0].path,
            straight: req.files.straight[0].path,
            rounded: req.files.rounded[0].path
        };

        const encodedFiles = await Promise.all(Object.values(paths).map(async (filePath) => {
            let svgData = await fs.readFile(filePath, 'utf-8');
            svgData = svgData.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
            return svgData;
        }));

        const imgTags = Object.keys(paths).map((key, index) => {
            return encodedFiles[index]
        });

        // Update the interface entry in the database
        const updatedicon = await ICON.findByIdAndUpdate(req.params.updateId, {
            name: req.body.name,
            tag: req.body.tag,
            category: req.body.category,
            regular: imgTags[0],
            bold: imgTags[1],
            thin: imgTags[2],
            solid: imgTags[3],
            straight: imgTags[4],
            rounded: imgTags[5]
        });

        if (!updatedicon) {
            throw new Error('Icon Not Found');
        }

        // Send success response
        res.status(200).json({
            status: "Success",
            message: "Icon Updated Successfully",
            data: updatedicon
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