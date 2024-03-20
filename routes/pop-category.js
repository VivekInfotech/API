var express = require('express');
var router = express.Router();

var adminController = require('../controller/admin')
var popCategoryController = require('../controller/pop-category')

router.post('/create', adminController.sequre, popCategoryController.popCategoryCreate);

router.get('/find', popCategoryController.popCategoryFind);

router.get('/findOne/:cardName', popCategoryController.popCategoryFindOne);

router.delete('/delete/:deleteId', adminController.sequre, popCategoryController.popCategoryDelete);

router.put('/update/:updateId', adminController.sequre, popCategoryController.popCategoryUpdate);


module.exports = router;