const fs = require('fs').promises;
const ICON = require('../models/icon');

exports.iconCreate = async function (req, res, next) {
    try {
        const svgPath = req.files[0].path;
        req.session.svgPath = svgPath;

        const svgContent = await fs.readFile(svgPath, 'utf-8');
        var encoded = Buffer.from(svgContent).toString('base64');

        const altText = req.body.name;
        req.body.icon = `<img src="data:image/svg+xml;base64,${encoded}" alt="${altText}" width="100px" height="auto" />`;

        req.body.categoryID = req.categoryID

        let iconData = await ICON.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "Icon created successfully",
            data: iconData
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}


exports.iconFind = async function (req, res, next) {
    try {

        let data = await ICON.find()

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

exports.iconFindOne = async function (req, res, next) {
    try {

        let data = await ICON.find({categoryID : req.params.catId})

        console.log(data);

        res.status(201).json({
            status: "Success",
            message: "Category Icon Find Successfully",
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

        // Set the req.body.icon property with the Base64-encoded image
        const altText = "Updated Icon Image";
        req.body.icon = `<img src="data:image/png;base64,${encoded}" alt="${altText}" width="100px" height="auto" />`;

        // Update the icon entry in the database
        const updatedIcon = await ICON.findByIdAndUpdate(req.params.updateId, { icon: req.body.icon });

        if (!updatedIcon) {
            throw new Error('Icon Not Found');
        }

        // Send success response
        res.status(201).json({
            status: "Success",
            message: "Icon Update Successfully",
            data: updatedIcon
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