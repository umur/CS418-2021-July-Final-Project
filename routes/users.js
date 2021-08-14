const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router
  .route("/")
  .get(usersController.authorizeSuperUsers, usersController.getAllUsers)
  .post(usersController.createUser);
router
  .route("/:id")
  .get(usersController.getUser)
  .put(usersController.authorizeSuperUsers, usersController.updateUser)
  .delete(usersController.authorizeSuperUsers, usersController.deleteUser);
module.exports = router;
