var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.get('/', usercontroller.getAllUsers);
router.post('/', usercontroller.postUser);



module.exports = router;