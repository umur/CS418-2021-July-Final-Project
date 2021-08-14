const express = require('express');
const router = express.Router();
const productController=require('../controllers/productController');
const userController=require('../controllers/userController');
const reviewController=require('../controllers/reviewController');
const ObjectId=require('mongodb').ObjectId;


router.get('/',reviewController.getAllReview);

router.get('/:id',reviewController.getReviewById);

router.get('/:prodSku',reviewController.getReviewByProdSku);

router.post('/:prodSku',reviewController.addReview);

router.put('/:id',userController.authorizedSuperUser,reviewController.updatedReview);

router.delete('/:id',userController.authorizedSuperUser,reviewController.deletedReview);




module.exports=router;