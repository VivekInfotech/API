var express = require('express');
var router = express.Router();

var categoryController = require('../controller/category')

router.post('/create', categoryController.categoryCreate);

router.get('/find', categoryController.categoryFind);

router.delete('/delete/:deleteId', categoryController.categoryDelete);

router.put('/update/:updateId', categoryController.categoryUpdate);


module.exports = router;