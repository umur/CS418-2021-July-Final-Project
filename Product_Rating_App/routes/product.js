const express = require("express");
const router = express.Router();
const authConroller = require("../controller/authController");
let getDB = require("../utils/database").getDB;

router.get("/", (req, res, next) => {
  let product1 = getDB().collection("product").find().toArray();
  product1.then((data) => {
    if (!data) {
      console.log("no data");
    }
    res.json({ data });
  });
});
router.get("/:name", (req, res, next) => {
  //res.json("ready to get with name");

  let product1 = getDB()
    .collection("product")
    .find({ productName: req.params.name })
    .toArray();
  product1.then((data) => {
    if (!data) {
      console.log("no data");
    }
    res.json({ data });
  });
});
router.post("/", (req, res, next) => {
  let product1 = getDB().collection("product").insertMany([req.body]);
  product1.then((data) => {
    if (!data) {
      console.log("no data");
    }
    res.json({ data });
  });
});
router.put("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  let product = getDB()
    .collection("product")
    .updateOne({ productName: req.params.name }, { $set: req.body });
  product.then((data) => {
    res.json(data);
  });
});
router.delete("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  let productname = req.params.name;
  let product = getDB()
    .collection("product")
    .deleteOne({ productName: productname });
  product.then((data) => {
    if (!productname) {
      console.log("no product name");
    }
    res.json({ data });
  });
});

module.exports = router;
