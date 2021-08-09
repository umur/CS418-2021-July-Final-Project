const express = require("express");
const router = express.Router();
const authConroller = require("../controller/authController");
const getDB = require("../utils/database").getDB;

function getProductByName(name) {
  return getDB()
    .collection("product")
    .findOne({ name: `${name}` });
}
function getUserByUserName(username) {
  return getDB()
    .collection("users")
    .findOne({ username: `${username}` });
}

router.get("/:name", (req, res, next) => {
  //   console.log(req.params.name, req.user.username);
  getProductByName(req.params.name).then((data) => {
    res.json(data.review);
  });
});
router.post("/", (req, res, next) => {
  getUserByUserName(req.user.username).then((dataUser) => {
    getProductByName(req.body.product_name).then((dataProduct) => {
      let reviewToInsert = {
        user: { firstname: dataUser.firstname, lastname: dataUser.lastname },
        product: {
          name: dataProduct.name,
          rating: req.body.rating,
        },
        createdAt: Date.now(),
      };
      //   console.log(reviewToInsert);

      let updateUserReviews = {
        productName: dataProduct.name,
        rating: req.body.rating,
      };
      console.log(updateUserReviews);

      getDB()
        .collection("users")
        .updateOne(
          { username: req.user.username },
          { $addToSet: { review: updateUserReviews } },
          { upsert: true }
        );

      getDB()
        .collection("review")
        .insertOne(reviewToInsert)
        .then((data) => {
          if (!data) {
            res.json("no data");
          } else {
            res.json(data);
          }
        });
    });
  });
});

router.put("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  res.json("updating review for product a");
});
router.delete("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  res.json("deleting review for product a");
});

module.exports = router;
