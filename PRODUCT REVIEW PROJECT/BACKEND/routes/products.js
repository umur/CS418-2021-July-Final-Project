const express = require('express');
const router = express.Router();
const productController=require('../controllers/productController');
const userController=require('../controllers/userController');


router.get('/',productController.getAllProducts);

router.get('/:prodSku',productController.getProdBySku);

router.post('/',productController.addProducts);

router.put('/:prodSku',userController.authorizedSuperUser, productController.updateProdBySku)

router.delete('/:prodSku', userController.authorizedSuperUser, productController.deleteProdBySku)

router.post('/review',productController.addReview);


module.exports=router;

