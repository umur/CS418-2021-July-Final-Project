const express = require('express');
const router = express.Router();
const JwtManager = require("../model/jwtManager");
const jwt = new JwtManager();

// GET All products 

router.get('/', (req, res, next) => {
    req.db.collection('products').find().toArray()
        .then(data => {
            res.json({
                status: "success",
                data: data
            });
        })
});
//add products 

router.post('/', (req, res, next) => {
    const header = req.headers.authorization;
    const verify = jwt.verify(header.split(" ")[1]);
    if (verify.role == "superuser") {
        const data = req.body;
        product = {
            name: data.name,
            price: data.price,
            reputation: '0'
        };
        req.db.collection('products')
            .insert(product)
            .then(result => {
                res.json({
                    status: 'success',
                    message: "post product",
                    data: result
                });
            });
    } else {
        res.json({ status: "faild", message: "unauthorize user" });
    }

});
//update price 
router.put('/', (req, res, next) => {
    const header = req.headers.authorization;
    const verify = jwt.verify(header.split(" ")[1]);
    if (verify.role == "superuser") {
        const data = req.body;
        req.db.collection('products')
            .updateOne(
                { name: data.name },
                {
                    $set: {
                        price: data.price
                    }
                }
            )
            .then(result => {
                res.json({
                    status: 'success',
                    message: "post product",
                    data: result
                });
            });
    } else {
        res.json({ status: "faild", message: "unauthorize user" });
    }
});
//delete  product

router.delete('/', (req, res, next) => {
    const header = req.headers.authorization;
    const verify = jwt.verify(header.split(" ")[1]);
    if (verify.role == "superuser") {
        const data = req.body;
        product = {
            name: data.name
        };
        req.db.collection('products')
            .deleteOne(product, (err, result) => {
                if (err) throw err;
                res.json({
                    status: 'success',
                    data: result
                });
            });
    } else {
        res.json({ status: "faild", message: "unauthorize user" });
    }
});
//change reputation

router.put('/reputation', (req, res, next) => {
    const data = req.body;
    let rate = 0;
    if (data.rate == "excellent") {
        rate = 2;
    } else if (data.rate == "bad") {
        rate = -1;
    }
    req.db.collection('products')
        .updateOne(
            { name: data.name },
            {
                $inc: {
                    reputation: rate
                }
            }
        )
        .then(result => {
            res.json({
                status: 'success',
                message: "post product",
                data: result
            });
        });
});
module.exports = router;