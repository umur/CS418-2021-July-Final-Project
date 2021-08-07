var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/productcontroller');

router.get('/', usercontroller.getAllProducts);
// router.post('/', usercontroller.postUser);
// router.delete('/:id', usercontroller.deleteById);
// router.put('/:id', usercontroller.editUser);



module.exports = router;