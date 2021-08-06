var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id", function (req, res, next) {
  res.send("respond with a resource for id");
});

router.get("/rating", function (req, res, next) {
  res.send("respond with a resource for id");
});

router.get("/product/:id", function (req, res, next) {
  res.send("respond with a resource for id");
});


module.exports = router;
