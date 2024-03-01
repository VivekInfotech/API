var express = require('express');
var router = express.Router();

var editIconController = require('../controller/editIcon')


router.post('/create/:color', editIconController.editIconCreate);

router.get('/find', editIconController.editIconFind);

router.delete('/delete/:deleteId', editIconController.editIconDelete);

router.put('/update/:updateId', editIconController.editIconUpdate);



module.exports = router;