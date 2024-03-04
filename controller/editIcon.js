const fs = require('fs').promises;
const EDITICON = require('../models/editIcon');
const ICON = require('../models/icon');

exports.editIconCreate = async function (req, res, next) {
    try {
        // Validate incoming parameters
        const iconId = req.params.id;
        const color = req.params.color;
        if (!iconId || !color) {
            throw new Error("Icon ID and color are required.");
        }

        // Find the icon by ID
        const icon = await ICON.findById(iconId);
        if (!icon) {
            throw new Error("Icon not found.");
        }

        // Prepare an array to hold edited icons
        const editedIconsArray = [];

        // List of properties to include
        const allowedProperties = ['regular', 'bold', 'thin', 'solid', 'straight', 'rounded'];

        // Iterate over each allowed property of the icon object
        allowedProperties.forEach(key => {
            if (icon[key]) {
                // Create an object with a single property and its data
                const editedIcon = {};
                if (typeof icon[key] === 'string') {
                    let svgContent = Buffer.from(icon[key].split(',')[1], 'base64').toString('utf-8');
                    const colorHex = "#" + color;
                    svgContent = svgContent.replace(/stroke="currentColor"/g, `stroke="${colorHex}"`);
                    svgContent = svgContent.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
                    const encodedSvg = Buffer.from(svgContent).toString('base64');
                    // editedIcon[key] = `<img src="data:image/svg+xml;base64,${encodedSvg}" width="100px" height="auto" />`;
                    editedIcon[key] = `${encodedSvg}`
                } else {
                    editedIcon[key] = icon[key];
                }
                // Push the edited icon object to the array
                // console.log("editedIcon :- ", editedIcon);
                editedIconsArray.push(editedIcon);
            }
        });

        // Save the edited icon data
        const editIconData = await EDITICON.create({ editIcon: editedIconsArray });

        res.status(201).json({
            status: "Success",
            message: "Edit Icon created successfully",
            data: editIconData
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.editIconFind = async function (req, res, next) {
    try {

        let data = await EDITICON.find()

        res.status(201).json({
            status: "Success",
            message: "editIcon Find Successfully",
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
        const iconId = req.params.updateId;
        const color = req.params.color;

        if (!iconId || !color) {
            throw new Error("Icon ID and color are required.");
        }

        const icon = await ICON.findById(iconId);
        if (!icon) {
            throw new Error("Icon not found.");
        }

        const allowedProperties = ['regular', 'bold', 'thin', 'solid', 'straight', 'rounded'];

        const editedIconsArray = [];

        allowedProperties.forEach((el, index) => {
            if (icon) {
                const editedIcon = {};

                let base64Data = icon[el].split(';base64,').pop();
                let svgData = Buffer.from(base64Data, 'base64').toString('utf-8');

                const colorHex = "#" + color;

                // Remove unwanted string
                svgData = svgData.replace(/�'m/g, '');

                if (svgData.includes('stroke="currentColor"')) {
                    svgData = svgData.replace(/stroke="currentColor"/g, `stroke="${colorHex}"`);
                    svgData = svgData.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
                } else {
                    svgData = svgData.replace(/stroke="#[a-zA-Z0-9]+"/g, `stroke="${colorHex}"`);
                    svgData = svgData.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s+fill="#[a-zA-Z0-9]+"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
                }

                const encodedSvg = Buffer.from(svgData).toString('base64');

                editedIcon[el] = `data:image/svg+xml;base64,${encodedSvg}`;
                // editedIcon[el] = `<img src="data:image/svg+xml;base64,${encodedSvg}" width="100px" height="auto" />`;
                editedIconsArray.push(editedIcon);
            }
        });

        const updatedIconData = await ICON.findByIdAndUpdate(iconId, {
            regular: editedIconsArray[0].regular,
            bold: editedIconsArray[1].bold,
            thin: editedIconsArray[2].thin,
            solid: editedIconsArray[3].solid,
            straight: editedIconsArray[4].straight,
            rounded: editedIconsArray[5].rounded
        });
        if (!updatedIconData) {
            throw new Error('Edit Icon data not found.');
        }

        res.status(200).json({
            status: "Success",
            message: "Edit Icon updated successfully",
            data: updatedIconData
        });

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};


