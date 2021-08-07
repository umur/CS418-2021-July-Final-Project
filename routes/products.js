const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);
router
  .route("/:id")
  .get(productsController.getProduct)
  .put(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
