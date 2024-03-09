const { convert } = require('convert-svg-to-png');
const PNGICON = require('../models/pngIcon');
const ICON = require('../models/icon');
const INTERFACE = require('../models/interface');
const ANIMATED = require('../models/animated');

exports.pngIconCreate = async function (req, res, next) {
    try {
        const iconId = req.params.id;
        const entityType = req.params.entityType;

        let entityModel;

        if (entityType === 'icon') {
            entityModel = ICON;
        } else if (entityType === 'interface') {
            entityModel = INTERFACE;
        } else if (entityType === 'animated') {
            entityModel = ANIMATED;
        } else {
            throw new Error("Invalid entityType. Must be 'icon' or 'interface' or 'animated'.");
        }

        const icon = await entityModel.findById(iconId);
        if (!icon) {
            throw new Error("Icon not found.");
        }

        const allowedProperties = ['regular', 'bold', 'thin', 'solid', 'straight', 'rounded'];
        const editedIconsArray = [];
        
        for (const el of allowedProperties) {
            if (icon && icon[el]) {
                const editedIcon = {};
                const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="65" height="65">${icon[el]}</svg>`;
                
                // Convert SVG to PNG buffer
                const pngBuffer = await convert(svgContent, { width: 300, height: 300 });
                
                // Convert the buffer to base64
                const encoded = pngBuffer.toString('base64');
                
                // Create the SVG data string with base64 encoded PNG
                const svgData = `<img src="data:image/png;base64,${encoded}" width="100px" height="auto" />`;
                
                editedIcon[el] = svgData;
                editedIconsArray.push(editedIcon);
            }
        }

        console.log(editedIconsArray[0].regular);
        
        const pngIconRecord = await PNGICON.create({
            pngIcon:{regular: editedIconsArray[0].regular,
            bold: editedIconsArray[1].bold,
            thin: editedIconsArray[2].thin,
            solid: editedIconsArray[3].solid,
            straight: editedIconsArray[4].straight,
            rounded: editedIconsArray[5].rounded}
        });

        res.status(201).json({
            status: "Success",
            message: "PNG Icon Update successfully",
            data: pngIconRecord
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
        const iconId = req.params.updateId;
        const entityType = req.params.entityType;

        let entityModel;

        if (entityType === 'icon') {
            entityModel = ICON;
        } else if (entityType === 'interface') {
            entityModel = INTERFACE;
        } else if (entityType === 'animated') {
            entityModel = ANIMATED;
        } else {
            throw new Error("Invalid entityType. Must be 'icon' or 'interface' or 'animated'.");
        }

        const icon = await entityModel.findById(iconId);
        if (!icon) {
            throw new Error("Icon not found.");
        }
        
        const allowedProperties = ['regular', 'bold', 'thin', 'solid', 'straight', 'rounded'];
        const editedIconsArray = [];

        
        for (const el of allowedProperties) {
            if (icon && icon[el]) {
                const editedIcon = {};
                let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="65" height="65">${icon[el]}</svg>`;
                
                // Convert SVG to PNG buffer
                const pngBuffer = await convert(svgContent, { width: 300, height: 300 });
                
                // Convert the buffer to base64
                const encoded = pngBuffer.toString('base64');
                
                // Create the SVG data string with base64 encoded PNG
                const svgData = `<img src="data:image/png;base64,${encoded}" width="100px" height="auto" />`;
                
                editedIcon[el] = svgData;
                editedIconsArray.push(editedIcon);
            }
        }

        console.log(editedIconsArray[0].regular);

        const pngIconRecord = await PNGICON.findByIdAndUpdate("65eb2beac9a725d65d84f30f", {
            pngIcon:{regular: editedIconsArray[0].regular,
                bold: editedIconsArray[1].bold,
                thin: editedIconsArray[2].thin,
                solid: editedIconsArray[3].solid,
                straight: editedIconsArray[4].straight,
                rounded: editedIconsArray[5].rounded}
        });

        res.status(201).json({
            status: "Success",
            message: "PNG Icon Update successfully",
            data: pngIconRecord
        });
    } catch (error) {
        // Send error response
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
}






// exports.pngIconUpdate = async function (req, res, next) {
//     try {
//         const iconId = req.params.updateId;
//         const color = req.params.color;
//         const entityType = req.params.entityType;

//         let entityModel;

//         if (entityType === 'icon') {
//             entityModel = ICON;
//         } else if (entityType === 'interface') {
//             entityModel = INTERFACE;
//         } else if (entityType === 'animated') {
//             entityModel = ANIMATED;
//         } else {
//             throw new Error("Invalid entityType. Must be 'icon' or 'interface' or 'animated'.");
//         }

//         const icon = await entityModel.findById(iconId);
//         if (!icon) {
//             throw new Error("Icon not found.");
//         }
        
//         const allowedProperties = ['regular', 'bold', 'thin', 'solid', 'straight', 'rounded'];
//         const editedIconsArray = [];

        
//         for (const el of allowedProperties) {
//             if (icon && icon[el]) {
//                 const editedIcon = {};
//                 let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="65" height="65">${icon[el]}</svg>`;
                
//                 const colorHex = "#" + color;
                
//                 if (svgContent.includes('stroke="currentColor"')) {
//                     svgContent = svgContent.replace(/stroke="currentColor"/g, `stroke="${colorHex}"`);
//                     svgContent = svgContent.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
//                     svgContent = svgContent.replace(/<path\s+d="([^"]+)"\s*\/?>/g, `<path d="$1" fill="${colorHex}" />`);
                    
//                 } else {
//                     svgContent = svgContent.replace(/stroke="#[a-zA-Z0-9]+"/g, `stroke="${colorHex}"`);
//                     svgContent = svgContent.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s+fill="#[a-zA-Z0-9]+"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
                    
//                     if (svgContent.includes('fill="#')) {
//                         svgContent = svgContent.replace(/<path\s+d="([^"]+)"\s+fill="#[a-zA-Z0-9]+"/g, `<path d="$1" fill="${colorHex}" />`);
//                     } else {
//                         svgContent = svgContent.replace(/<path\s+d="([^"]+)"\s*\/?>/g, `<path d="$1" fill="${colorHex}" />`);
//                     }
//                 }
                
//                 // Convert SVG to PNG buffer
//                 const pngBuffer = await convert(svgContent, { width: 300, height: 300 });
                
//                 // Convert the buffer to base64
//                 const encoded = pngBuffer.toString('base64');
                
//                 // Create the SVG data string with base64 encoded PNG
//                 const svgData = `<img src="data:image/png;base64,${encoded}" width="100px" height="auto" />`;
                
//                 editedIcon[el] = svgData;
//                 editedIconsArray.push(editedIcon);
//             }
//         }

//         console.log(editedIconsArray[0].regular);

//         const pngIconRecord = await PNGICON.findByIdAndUpdate("65eb2beac9a725d65d84f30f", {
//             pngIcon:{regular: editedIconsArray[0].regular,
//                 bold: editedIconsArray[1].bold,
//                 thin: editedIconsArray[2].thin,
//                 solid: editedIconsArray[3].solid,
//                 straight: editedIconsArray[4].straight,
//                 rounded: editedIconsArray[5].rounded}
//         });

//         res.status(201).json({
//             status: "Success",
//             message: "PNG Icon Update successfully",
//             data: pngIconRecord
//         });
//     } catch (error) {
//         // Send error response
//         res.status(500).json({
//             status: "Fail",
//             message: error.message
//         });
//     }
// }