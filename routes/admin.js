var express = require('express');
var router = express.Router();

var adminController = require('../controller/admin')


router.post('/signup', adminController.adminSignup);

router.post('/login', adminController.adminLogin);

router.get('/find', adminController.adminFind);

router.delete('/delete/:deleteId', adminController.adminDelete);

router.put('/update/:updateId', adminController.adminUpdate);


module.exports = router;