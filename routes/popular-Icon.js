var express = require('express');
var router = express.Router();
const fs = require('fs'); // Import fs without .promises suffix

var adminController = require('../controller/admin');
var popularController = require('../controller/popular-Icon');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './public/images/popular';
        // Create directory if it doesn't exist
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
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
    { name: 'icon', maxCount: 6 }
]);


router.post('/create', adminController.sequre, upload, popularController.popularCreate);

router.get('/find', popularController.popularFind);

router.get('/findById/:iconId', popularController.popularFindById);

router.get('/findOne/:categoryName', popularController.popularFindOne);

router.delete('/delete/:deleteId', adminController.sequre, popularController.popularDelete);

router.put('/update/:updateId', adminController.sequre, upload, popularController.popularUpdate);


module.exports = router;
