var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController');


router.post('/sign-up',userController.signUp);

router.post('/sign-in', userController.signIn);

router.use('/',userController.authorize);

router.get('/:username',userController.authorizedSuperUser,userController.getUser);

router.put('/resetpass/:username',userController.authorizedSuperUser,userController.resetPass);

router.delete('/:username',userController.authorizedSuperUser,userController.deleteUser);



module.exports = router;








