let admin = require("../controller/auth")
const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.get('/users', admin.authorizeAdmin,usercontroller.getAllUsers);
// router.post('/register', usercontroller.postUser);
router.delete('/user/:id', admin.authorizeAdmin, usercontroller.deleteById)
router.put('/user/:id', admin.authorizeAdmin, usercontroller.editUser);
router.get('/user/:id', admin.authorizeAdmin,usercontroller.getuserById);



module.exports = router;

