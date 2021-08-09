const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
    req.db.collection('users').findOne()
        .then(data => {
            res.json({
                status: "success",
                data: data
            });
        })
    res.json({ status: 'fail', message: "unauthorize user" });

});