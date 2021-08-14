const logger = require("../logger");
const { getDatabase } = require("../mongodb/connect");

exports.getAllReviews = (req, res, next) => {
  const product = { productId: Number(req.params.id) };
  const db = getDatabase();
  db.collection("products")
    .aggregate([
      { $match: product },
      {
        $project: {
          productName: 1,
          "review.userName": 1,
          "review.reputationPts": 1,
          _id: 0,
        },
      },
    ])
    .toArray()
    .then((product) => {
      console.log(product);
      res.json(product);
    })
    .catch((err) => console.log(err));
};
exports.getReview = (req, res, next) => {
  const reviewId = { reviewId: Number(req.params.rid) };
  console.log(reviewId);
  const db = getDatabase();
  db.collection("products")
    .aggregate([
      { $match: { "review.reviewId": 3 } },
      { $project: { _id: 0, price: 0, productId: 0, "review.reviewId": 0 } },
    ])

    .toArray()
    .then((product) => res.json(product))
    .catch((err) => next(err));
};
let id = 1;

exports.updateReview = (req, res, next) => {
  const rId = Number(req.params.rid);
  const review = req.body.review;
  let increment;
  if (review == "bad") {
    increment = -1;
  } else if (review == "good") {
    increment = 0;
  } else if (review == "excellent") {
    increment = 2;
  }

  const db = getDatabase();
  db.collection("products")
    .updateOne(
      { productId: Number(req.params.id), "review.reviewId": rId },
      {
        $set: { "review.$": { reputationPts: increment } },
        $inc: { totalReputationPts: increment },
      }
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => next(err));
};

let review_id = 1;
exports.createReview = (req, res, next) => {
  const product = { productId: Number(req.params.id) };
  const review = req.body.review;
  const userName = req.body.userName;
  let increment;
  if (review == "bad") {
    increment = -1;
  } else if (review == "good") {
    increment = 0;
  } else if (review == "excellent") {
    increment = 2;
  }
  const reviewInfo = {
    userName: userName,
    reputationPts: increment,
    reviewId: review_id,
  };
  review_id++;

  const db = getDatabase();
  db.collection("products")
    .updateMany(product, {
      $push: {
        review: reviewInfo,
      },
      $inc: { totalReputationPts: increment },
    })

    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => next(err));
};
exports.deleteReview = (req, res, next) => {
  const rId = Number(req.params.rid);

  const db = getDatabase();
  db.collection("products")
    .updateOne(
      { productId: Number(req.params.id), "review.reviewId": rId },
      { $unset: { "review.$": 1 } }
    )
    .then(() => {
      res.json({ status: "Product Deleted" });
    })
    .catch((err) => next(err));
};
