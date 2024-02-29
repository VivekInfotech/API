var express = require('express');
var router = express.Router();

var adminController = require('../controller/admin')
var categoryController = require('../controller/category')

router.post('/create', adminController.sequre, categoryController.categoryCreate);

router.get('/find', categoryController.categoryFind);

router.delete('/delete/:deleteId', adminController.sequre, categoryController.categoryDelete);

router.put('/update/:updateId', adminController.sequre, categoryController.categoryUpdate);


module.exports = router;