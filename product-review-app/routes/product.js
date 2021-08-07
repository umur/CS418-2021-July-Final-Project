var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/productcontroller');

router.get('/', usercontroller.getAllProducts);
router.post('/', usercontroller.createProduct);
router.delete('/:id', usercontroller.deleteProduct);
router.put('/:id', usercontroller.editProduct);



module.exports = router;