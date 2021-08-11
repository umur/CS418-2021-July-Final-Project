var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController');

//users register
router.post('/sign-up',userController.signUp);

//users log in
router.post('/sign-in', userController.signIn);

//list all users account-only authorizedSuperUser
router.get('/listUsers,',userController.listAllUserAccounts);

//activates user

//deactivates user

//reset users'password


// authorize user to use app 
router.use('/',userController.authorize);







module.exports = router;








