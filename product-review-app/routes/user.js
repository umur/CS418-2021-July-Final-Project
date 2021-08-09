
var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.get('/register', usercontroller.getAllUsers);
router.post('/register', usercontroller.postUser);
router.delete('/register/:id', usercontroller.deleteById);
router.put('/register/:id', usercontroller.editUser);
router.get('/register/:id', usercontroller.getuserById);



module.exports = router;

