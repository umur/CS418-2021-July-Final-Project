var express = require("express");
var router = express.Router();

router.get("/products", (req, res) => {
  req.db
    .collection("products")
    .find({})
    .sort({ rep_score: 1 })
    .toArray((err, data) => {
      if (err) throw err;
      res.json(data);
    });
});
router.get("/products/:productName", (req, res) => {
  req.db
    .collection("products")
    .findOne({ productName: req.params.productName }, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
});
router.post("/products", (req, res) => {
  req.db.collection("products").insert(req.body, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

router.put("/products/:productName", (req, res) => {
  req.db.collection("products").updateOne(
    { productName: req.params.productName },
    {
      $set: {
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category,
        rep_score: req.body.rep_score,
      },
    },
    (err, data) => {
      if (err) throw err;
      res.json({ status: data });
    }
  );
});

router.delete("/products/:productName", (req, res) => {
  req.db
    .collection("products")
    .remove({ productName: req.params.productName }, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
});

module.exports = router;
