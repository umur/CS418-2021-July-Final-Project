const express = require('express');
const router = express.Router();
const productController=require('../controllers/productController');
const userController=require('../controllers/userController');
// const ObjectId=require('mongodb').ObjectId;


//fetch all the products
router.get('/',productController.getAllProducts);

//get product by Sku
router.get('/:prodSku',productController.getProdBySku);

// add products
router.post('/',productController.addProducts);

//update product-authorize superUser
router.put('/:prodSku',userController.authorizedSuperUser, productController.updateProdBySku)

//delete product-authorize superUser
router.delete('/:prodSku', userController.authorizedSuperUser, productController.deleteProdBySku)

//add review for prodSku
router.post('/review',productController.addReview);


module.exports=router;

