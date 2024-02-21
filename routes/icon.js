var express = require('express');
var router = express.Router();

var iconController = require('../controller/icon')
var adminController = require('../controller/admin')
var categoryController = require('../controller/category')

const fs = require('fs').promises;

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })


router.post('/create', adminController.sequre, categoryController.sequre, upload.array('icon', 50), iconController.iconCreate);

router.get('/find', iconController.iconFind);

router.get('/findOne/:catId', iconController.iconFindOne);

router.delete('/delete/:deleteId', adminController.sequre, iconController.iconDelete);

router.put('/update/:updateId', adminController.sequre, upload.array('icon', 50), iconController.iconUpdate);



module.exports = router;