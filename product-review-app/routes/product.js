var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/productcontroller');

router.get('/product', usercontroller.getAllProducts);
router.post('/product', usercontroller.createProduct);
router.delete('/product/:id', usercontroller.deleteProduct);
router.put('/product/:id/review', usercontroller.addreview);
router.put('/product/:id', usercontroller.editProduct);
router.get('/product/:id', usercontroller.getOneProduct);


module.exports = router;