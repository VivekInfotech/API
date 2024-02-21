const fs = require('fs').promises;
const { convert } = require('convert-svg-to-png');
const PNGICON = require('../models/pngIcon');


exports.pngIconCreate = async function (req, res, next) {
    try {
        const svgPath = req.session.svgPath;
        const Width = 3000;
        const Height = 4000;

        console.log(svgPath);

        const svgContent = await fs.readFile(svgPath, 'utf-8');

        const pngData = await convert(svgContent, {
            width: Width,
            height: Height
        });

        const pngPath = svgPath.replace('.svg', '.png');
        await fs.writeFile(pngPath, pngData);


        const encoded = Buffer.from(pngData).toString('base64');

        req.body.pngIcon = `<img src="data:image/png;base64,${encoded}" width="100px" height="auto" />`;

        const pngIconData = await PNGICON.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "PNG Icon created successfully",
            data: pngIconData
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
}

exports.pngIconFind = async function (req, res, next) {
    try {

        let data = await PNGICON.find()

        res.status(201).json({
            status: "Success",
            message: "pngIcon Find Successfully",
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

exports.pngIconDelete = async function (req, res, next) {
    try {

        let deleteData = await PNGICON.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('pngIcon Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "pngIcon Delete Successfully",
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

exports.pngIconUpdate = async function (req, res, next) {
    try {
        // Read the SVG file and convert it to PNG
        const svgPath = req.files[0].path;
        const Width = 3000;
        const Height = 4000;

        const svgContent = await fs.readFile(svgPath, 'utf-8');
        const pngData = await convert(svgContent, {
            width: Width,
            height: Height
        });

        // Write the PNG data to a file
        const pngPath = svgPath.replace('.svg', '.png');
        await fs.writeFile(pngPath, pngData);

        // Encode the PNG data as Base64
        const encoded = Buffer.from(pngData).toString('base64');

        // Set the req.body.pngIcon property with the Base64-encoded image
        const altText = "Updated pngIcon Image";
        req.body.pngIcon = `<img src="data:image/png;base64,${encoded}" alt="${altText}" width="100px" height="auto" />`;

        // Update the pngIcon entry in the database
        const updatedpngIcon = await PNGICON.findByIdAndUpdate(req.params.updateId, { pngIcon: req.body.pngIcon });

        if (!updatedpngIcon) {
            throw new Error('pngIcon Not Found');
        }

        // Send success response
        res.status(201).json({
            status: "Success",
            message: "pngIcon Update Successfully",
            data: updatedpngIcon
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