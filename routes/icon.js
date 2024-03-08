var express = require('express');
var router = express.Router();

var iconController = require('../controller/icon')
var adminController = require('../controller/admin')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/icon');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
});

// Define file filter function for validation
const fileFilter = function (req, file, cb) {
    // Check file types or other validation conditions
    if (file.mimetype === 'image/svg+xml') {
        // Accept SVG files
        cb(null, true);
    } else {
        // Reject other file types
        cb(new Error('Unsupported file type. Only SVG files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter // Add file filter function here
}).fields([
    { name: 'regular', maxCount: 6 },
    { name: 'bold', maxCount: 6 },
    { name: 'thin', maxCount: 6 },
    { name: 'solid', maxCount: 6 },
    { name: 'straight', maxCount: 6 },
    { name: 'rounded', maxCount: 6 }
]);


router.post('/create', adminController.sequre, upload, iconController.iconCreate);

router.get('/find', iconController.iconFind);

router.get('/findById/:iconId', iconController.iconFindById);

router.get('/findOne/:categoryName', iconController.iconFindOne);

router.delete('/delete/:deleteId', adminController.sequre, iconController.iconDelete);

router.put('/update/:updateId', adminController.sequre, upload, iconController.iconUpdate);



module.exports = router;