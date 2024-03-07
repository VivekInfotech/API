var express = require('express');
var router = express.Router();

var editIconController = require('../controller/editIcon')


router.post('/create/:id/:color', editIconController.editIconCreate);

router.get('/find', editIconController.editIconFind);

router.delete('/delete/:deleteId', editIconController.editIconDelete);

router.put('/update/:updateId/:color/:entityType', editIconController.editIconUpdate);



module.exports = router;