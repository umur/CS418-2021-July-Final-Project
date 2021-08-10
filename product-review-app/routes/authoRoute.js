const express = require('express');
const userController = require('../controller/auth');
const userController2 = require('../controller/usercontroller');
const router = express.Router();



router.post('/login',userController.login);
router.post('/register', userController2.postUser);
// router.get('/register/:id', userController2.getuserById);

router.use(userController.authorize)//since login no need to authorized add it under
module.exports = router;