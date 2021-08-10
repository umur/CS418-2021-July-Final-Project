const Product = require("../model/product");

exports.getAllProducts = (req, res, next) => {
  console.log(req.user);
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

exports.createProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const review = req.body.review;
  const username = req.user.username;
  const userId = req.user.id;
  const rating = req.body.rating;
  const rev = {
      user:{
          id:userId,
          username:username
      },
      review:review,
      rating:rating
  };

  const reviewArray = [rev];

console.log(req.body.review)
  const prod = new Product(null, title, price,reviewArray);

  prod
    .save()
    .then((result) => {
      res.json({ status: "created" });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteById(req.params.id)
    .then((result) => {
      res.json({ status: "success" });
    })
    .catch((err) => console.log(err));
};

exports.editProduct = (req, res, next) => {
  const updatedProduct = new Product(
    req.params.id,
    req.body.title,
    req.body.price,
    req.body.review,
    req.body.rating
  );
  console.log(updatedProduct);

  updatedProduct
    .updateProduct()
    .then((result) => {
      res.json({ status: "success" });
    })
    .catch((err) => console.log(err));
};

exports.addreview = (req, res, next) => {
  let id = req.body._id;
  let rating = req.body.rating;
  let review = req.body.review;
  const username = req.user.username;
  const userId = req.user.id;
  // let id = req.user.id;

  let revObject = {
    user: {
      id: userId,
      username: username,
    },
    review: review,
    rating: rating,
  };

  const reviewProduct = new Product(
    req.body._id,
    req.body.title,
    req.body.price,
    revObject
  );
console.log(req.user.id)
  reviewProduct
    .addNewReview()
    .then((result) => {
      res.json({ status: "success" });
    })
    .catch((err) => console.log(err));
};

exports.getOneProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};
