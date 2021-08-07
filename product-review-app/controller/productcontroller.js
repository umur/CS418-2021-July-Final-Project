const Product = require('../model/product');


exports.getAllProducts = (req, res, next) => {

    Product.findAll()
        .then(products => {
            res.json(products)
        })
        .catch(err => console.log(err));
};