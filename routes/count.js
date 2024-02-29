var express = require('express');
var router = express.Router();

var iconController = require('../controller/icon')
var countController = require('../controller/count')
var adminController = require('../controller/admin')
var categoryController = require('../controller/category')

const fs = require('fs').promises;

router.post('/create', adminController.sequre, countController.countCreate);

router.get('/find', countController.countFind);

router.get('/findOne/:categoryName', countController.countFindOne);

router.delete('/delete/:deleteId', adminController.sequre, countController.countDelete);

router.put('/update/:updateId', adminController.sequre, countController.countUpdate);



module.exports = router;