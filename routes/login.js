const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.post("/", usersController.login);

module.exports = router;
