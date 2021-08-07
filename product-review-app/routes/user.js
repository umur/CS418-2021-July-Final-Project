var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.get('/', usercontroller.getAllUsers);
router.post('/', usercontroller.postUser);
router.delete('/:id', usercontroller.deleteById);



module.exports = router;