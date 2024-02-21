const fs = require('fs').promises;
const { convert } = require('convert-svg-to-png');
const EDITICON = require('../models/editIcon');


exports.editIconCreate = async function (req, res, next) {
    try {
        const svgPath = req.session.svgPath;
        const svgContent = await fs.readFile(svgPath, 'utf-8');

        const colorIcon = svgContent.replace(/stroke="#\w+"/g, 'stroke="gray"');

        const encoded = Buffer.from(colorIcon).toString('base64');

        req.body.editIcon = `<img src="data:image/svg+xml;base64,${encoded}" width="100px" height="auto" />`;
        // req.body.editIcon = `data:image/svg+xml;base64,${encoded}`;

        const editIconData = await EDITICON.create(req.body);

        await fs.writeFile('./public/demo.txt',req.body.editIcon,'utf-8')

        res.status(201).json({
            status: "Success",
            message: "Edit Icon created successfully",
            data: editIconData
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
}

exports.editIconFind = async function (req, res, next) {
    try {

        let data = await fs.readFile('./public/demo.txt','utf-8')

        res.render('index', {data})

        // let data = await EDITICON.find()

        // res.status(201).json({
        //     status: "Success",
        //     message: "editIcon Find Successfully",
        //     data
        // })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.editIconDelete = async function (req, res, next) {
    try {

        let deleteData = await EDITICON.findByIdAndDelete(req.params.deleteId)
        if (!deleteData) {
            throw new Error('editIcon Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "editIcon Delete Successfully",
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

exports.editIconUpdate = async function (req, res, next) {
    try {
        const svgPath = req.files[0].path;

        const svgContent = await fs.readFile(svgPath, 'utf-8');
        const encoded = Buffer.from(svgContent).toString('base64');

        const altText = "Updated editIcon Image";
        req.body.editIcon = `<img src="data:image/png;base64,${encoded}" alt="${altText}" width="100px" height="auto" />`;

        const updatededitIcon = await EDITICON.findByIdAndUpdate(req.params.updateId, { editIcon: req.body.editIcon });

        if (!updatededitIcon) {
            throw new Error('editIcon Not Found');
        }

        res.status(201).json({
            status: "Success",
            message: "editIcon Update Successfully",
            data: updatededitIcon
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}