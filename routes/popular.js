var express = require('express');
var router = express.Router();

var adminController = require('../controller/admin')
var popularController = require('../controller/popular')

router.post('/create', adminController.sequre, popularController.popularCreate);

router.get('/find', popularController.popularFind);

router.delete('/delete/:deleteId', adminController.sequre, popularController.popularDelete);

router.put('/update/:updateId', adminController.sequre, popularController.popularUpdate);


module.exports = router;