var express = require('express');
var router = express.Router();

var tagController = require('../controller/tag')


router.get('/findByName/:tagName', tagController.tagFindByName);

router.get('/find/', tagController.tagFind);


module.exports = router;