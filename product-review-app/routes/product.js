var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/productcontroller');
const admincontroller = require('../controller/auth');

router.get('/product', usercontroller.getAllProducts);
router.post('/product', usercontroller.createProduct);
router.delete('/product/:id',admincontroller.authorizeAdmin,usercontroller.deleteProduct);
router.put('/product/:id/review', usercontroller.addreview);
router.put('/product/:id', admincontroller.authorizeAdmin,usercontroller.editProduct);
router.get('/product/:id', usercontroller.getOneProduct);


module.exports = router;