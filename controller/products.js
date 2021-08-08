const { getDatabase } = require("../mongodb/connect");
exports.getAllProducts = (req, res, next) => {
  const db = getDatabase();
  db.collection("products")
    .find()
    .toArray()
    .then((product) => res.json(product))
    .catch((err) => next(err));
};
exports.getProduct = (req, res, next) => {
  const product = { productId: Number(req.params.id) };
  const db = getDatabase();
  db.collection("products")
    .find(product)
    .toArray()
    .then((product) => res.json(product))
    .catch((err) => next(err));
};
exports.createProduct = (req, res, next) => {
  const newProduct = {
    productName: req.body.productName,
    price: req.body.price,
    productId: 7,
  };
  const db = getDatabase();
  db.collection("products")
    .insertOne(newProduct)
    .then(res.json({ status: "Product Created" }))
    .catch((err) => next(err));
};
exports.updateProduct = (req, res, next) => {
  const product = { productId: Number(req.params.id) };
  const newProduct = req.body;
  const db = getDatabase();
  db.collection("products")
    .updateOne(product, { $set: { newProduct } })
    .then(() => {
      res.json({ status: "Product Updated" });
    })
    .catch((err) => next(err));
};
exports.deleteProduct = (req, res, next) => {
  const db = getDatabase();
  db.collection("products")
    .deleteOne()
    .then(() => {
      res.json({ status: "Product Deleted" });
    })
    .catch((err) => next(err));
};
