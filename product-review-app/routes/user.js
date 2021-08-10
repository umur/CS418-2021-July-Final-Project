let admin = require("../controller/auth")
const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.get('/register', usercontroller.getAllUsers);
// router.post('/register', usercontroller.postUser);
router.delete('/register/:id', admin.authorizeAdmin, usercontroller.deleteById)
router.put('/register/:id', usercontroller.editUser);
router.get('/register/:id', usercontroller.getuserById);



module.exports = router;

