// controller:
const fs = require('fs').promises;
const INTERFACE = require('../models/interface');

exports.interfaceCreate = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.tag || !req.body.category) {
            throw new Error('Name, tag and category are required fields.');
        }
        
        const paths = {
            regular: req.files.regular[0].path,
            bold: req.files.bold[0].path,
            thin: req.files.thin[0].path,
            solid: req.files.solid[0].path,
            straight: req.files.straight[0].path,
            rounded: req.files.rounded[0].path
        };

        const encodedFiles = await Promise.all(Object.values(paths).map(async (filePath) => {
            const svgContent = await fs.readFile(filePath, 'utf-8');
            return Buffer.from(svgContent).toString('base64');
        }));

        const altText = req.body.name;
        const imgTags = Object.keys(paths).map((key, index) => {
            // return `<img src="data:image/svg+xml;base64,${encodedFiles[index]}" alt="${altText}" width="100px" height="auto" />`;
            return `data:image/svg+xml;base64,${encodedFiles[index]}`;
        });

        const interfaceData = await INTERFACE.create({
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
            message: "interface icon created successfully",
            data: interfaceData
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.interfaceFind = async function (req, res, next) {
    try {

        let data = await INTERFACE.find()

        res.status(201).json({
            status: "Success",
            message: "interface icon Find Successfully",
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

exports.interfaceFindOne = async function (req, res, next) {
    try {
        let data = await INTERFACE.find({ category: req.params.categoryName });

        res.status(201).json({
            status: "Success",
            message: "interface Find Successfully",
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

exports.interfaceFindById = async function (req, res, next) {
    try {
        let data = await INTERFACE.findById(req.params.iconId);

        res.status(201).json({
            status: "Success",
            message: "Interface Icon Find Successfully",
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

exports.interfaceDelete = async function (req, res, next) {
    try {

        let deleteData = await INTERFACE.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('interface Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "interface icon Delete Successfully",
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

exports.interfaceUpdate = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.tag || !req.body.category) {
            throw new Error('Name, tag and category are required fields.');
        }

        const paths = {
            regular: req.files.regular[0].path,
            bold: req.files.bold[0].path,
            thin: req.files.thin[0].path,
            solid: req.files.solid[0].path,
            straight: req.files.straight[0].path,
            rounded: req.files.rounded[0].path
        };

        const encodedFiles = await Promise.all(Object.values(paths).map(async (filePath) => {
            const svgContent = await fs.readFile(filePath, 'utf-8');
            return Buffer.from(svgContent).toString('base64');
        }));

        const altText = req.body.name;
        const imgTags = Object.keys(paths).map((key, index) => {
            return `data:image/svg+xml;base64,${encodedFiles[index]}`;
        });

        // Update the interface entry in the database
        const updatedinterface = await INTERFACE.findByIdAndUpdate(req.params.updateId, {
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

        if (!updatedinterface) {
            throw new Error('interface Not Found');
        }

        // Send success response
        res.status(200).json({
            status: "Success",
            message: "interface icon Updated Successfully",
            data: updatedinterface
        });
    }
    catch (error) {
        // Send error response
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};