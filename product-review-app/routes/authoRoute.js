const express = require('express');
const userController = require('../controller/auth');
const router = express.Router();



router.post('/login',userController.login);

router.use(userController.authorize)//since login no need to authorized add it under
module.exports = router;