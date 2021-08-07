const Product = require("../model/product");

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

exports.createProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;

  const prod = new Product(null, title, price);
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
    req.body._id,
    req.body.title,
    req.body.price
  );
  console.log(updatedProduct);

  updatedProduct
    .updateProduct()
    .then((result) => {
      res.json({ status: "success" });
    })
    .catch((err) => console.log(err));
};
