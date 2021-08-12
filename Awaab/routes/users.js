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
router.post('/', (req, res, next) => {
    const data = req.body;
    user = {
        username: data.username,
        pass: data.password,
        role: 'member'
    };
    req.db.collection('users')
        .insert(user)
        .then(result => {
            res.json({
                status: 'success',
                message: "post users",
                data: result
            });
        })
        .catch();

});
router.delete('/', (req, res, next) => {
    const data = req.body;
    user = {
        username: data.username
    };
    req.db.collection('users')
        .deleteOne(user, (err, result) => {
            if (err) throw err;
            // console.log("Awaab");
            res.json({
                status: 'success',
                data: result
            });
        });
});
//change password
router.put('/pass', (req, res, next) => {
    const data = req.body;
    req.db.collection('users')
        .updateOne(
            { username: data.username },
            {
                $set: {
                    pass: data.password
                }
            }
        )
        .then(
            (result) => {
                // console.log(data);
                res.json({
                    status: "success",
                    data: result
                });
            });
});
//active/deactive
router.put('/active', (req, res, next) => {
    const data = req.body;
    req.db.collection('users')
        .updateOne(
            { username: data.username },
            {
                $set: {
                    active: data.active
                }
            }
        )
        .then(
            (result) => {
                // console.log(data);
                res.json({
                    status: "success",
                    data: result
                });
            });
});
module.exports = router;
