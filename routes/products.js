const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");
const usersController = require("../controller/users");
const reviewsController = require("../controller/reviews");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);
router
  .route("/:id")
  .get(productsController.getProduct)
  .put(usersController.authorizeSuperUsers, productsController.updateProduct)
  .delete(
    usersController.authorizeSuperUsers,
    productsController.deleteProduct
  );
router.route("/:id/review").get(reviewsController.getAllReviews);
router.route("/:id/review").post(reviewsController.createReview);

router
  .route("/:id/review/:rid")
  .get(reviewsController.getReview)
  .put(usersController.authorizeSuperUsers, reviewsController.updateReview)
  .delete(usersController.authorizeSuperUsers, reviewsController.deleteReview);

module.exports = router;
