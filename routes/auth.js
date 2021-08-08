
const express = require('express');
const router = express.Router();
const JwtManager = require('../model/jwtManager');
router.post('/', function (req, res, next) {
    const username = req.body.username;
    const pwd = req.body.password;
    req.db.collection('users').findOne({ username: username, pwd: pwd })
        .then(data => {
            if (!data) {
                res.json({ status: "fail", message: "invalid-user" });
            } else {
                const dataObject = { userName: username, password: pwd, role: data.role };
                const jwt = new JwtManager();
                const token = jwt.generate(dataObject);
                res.json({
                    status: "success",
                    user: username,
                    role: dataObject.role,
                    accessToken: token
                });
            }
        });
});
module.exports = router;