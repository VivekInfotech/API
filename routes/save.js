var express = require('express');
var router = express.Router();

var saveController = require('../controller/save')

router.post('/create', saveController.saveCreate);

router.get('/find', saveController.saveFind);

router.delete('/delete/:deleteId', saveController.saveDelete);

router.put('/update/:updateId', saveController.saveUpdate);


module.exports = router;