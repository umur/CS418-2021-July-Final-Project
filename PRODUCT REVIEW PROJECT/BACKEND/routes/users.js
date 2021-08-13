var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController');


router.post('/sign-up',userController.signUp);

router.post('/sign-in', userController.signIn);

router.get('/listUsers,',userController.authorizedSuperUser,userController.listAllUserAccounts);

//activates user

//deactivates user

//reset users'password


router.use('/',userController.authorize);





module.exports = router;








