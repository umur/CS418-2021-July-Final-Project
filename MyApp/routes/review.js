var express = require("express");
var router = express.Router();

router.get("/review", (req, res) => {
  req.db
    .collection("reviews")
    .find({})
    .toArray((err, data) => {
      if (err) throw err;
      res.json(data);
    });
});
router.get("/review/:productName", (req, res) => {
  req.db
    .collection("reviews")
    .findOne({ productName: req.params.productName }, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
});
router.post("/review", (req, res) => {
  let points;
  if (req.body.rating == "excellent") {
    points = 2;
  } else if (req.body.rating == "bad") {
    points = -1;
  } else {
    points = 0;
  }

  req.db
    .collection("products")
    .update(
      { productName: req.body.productName },
      { $inc: { rep_score: points } },
      (err, data) => {
        if (err) throw err;
        //res.json(data);
      }
    );
  req.db.collection("reviews").insert(req.body, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
router.delete("/review/:productName", (req, res) => {
  req.db
    .collection("reviews")
    .remove({ productName: req.params.productName }, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
});
// router.update("/reviews/:productName", (req, res) => {
//   req.db
//     .collection("products")
//     .update(
//       { productName: req.params.productName },
//       { $set: { productName: req.body.productName, price: req.body.price } },
//       (err, data) => {
//         if (err) throw err;
//         res.json(data);
//       }
//     );
// });

module.exports = router;
