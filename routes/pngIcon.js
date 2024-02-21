var express = require('express');
var router = express.Router();

var pngIconController = require('../controller/pngIcon')


router.post('/create', pngIconController.pngIconCreate);

router.get('/find', pngIconController.pngIconFind);

router.delete('/delete/:deleteId', pngIconController.pngIconDelete);

router.put('/update/:updateId', pngIconController.pngIconUpdate);



module.exports = router;