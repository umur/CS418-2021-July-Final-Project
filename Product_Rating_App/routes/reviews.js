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

      //   if review for product already exists give message
      getDB()
        .collection("review")
        .findOne({
          $and: [
            { "user.firstname": dataUser.firstname },
            { "product.name": dataProduct.name },
          ],
        })
        .then((found) => {
          if (found) {
            res.json("rating by this user already exists");
          } else {
            getDB()
              .collection("review")
              .insertOne(reviewToInsert)
              .then((data) => {
                if (!data) {
                  res.json("no data");
                } else {
                  getDB()
                    .collection("users")
                    .updateOne(
                      { username: req.user.username },
                      {
                        $addToSet: {
                          review: {
                            productName: dataProduct.name,
                            rating: req.body.rating,
                            review_id: data.insertedId,
                          },
                        },
                      },
                      { upsert: true }
                    );

                  getDB()
                    .collection("product")
                    .updateOne(
                      { name: req.body.product_name },
                      {
                        $addToSet: {
                          review: {
                            review_id: data.insertedId,
                            firstname: dataUser.firstname,
                            lastname: dataUser.lastname,
                            rating: req.body.rating,
                          },
                        },
                      }
                    );
                  let addToReputaion;
                  if ((req.body.rating = "excellent")) {
                    addToReputation = 2;
                  } else if ((req.body.rating = "bad")) {
                    addToReputation = -1;
                  } else {
                    addToReputation = 0;
                  }

                  getDB()
                    .collection("product")
                    .updateOne(
                      { name: req.body.product_name },
                      {
                        $set: {
                          reputation: dataProduct.reputation + addToReputation,
                        },
                      }
                    );

                  res.json(data);
                }
              });
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
