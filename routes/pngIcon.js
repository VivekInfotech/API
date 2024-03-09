var express = require('express');
var router = express.Router();

var pngIconController = require('../controller/pngIcon')


router.post('/create/:id/:entityType', pngIconController.pngIconCreate);

router.get('/find', pngIconController.pngIconFind);

router.delete('/delete/:deleteId', pngIconController.pngIconDelete);

router.put('/update/:updateId/:entityType', pngIconController.pngIconUpdate);



module.exports = router;