const express = require("express");
const path = require("path");
const router = express.Router();

router.post("/signup", (req, res) => {
  req.db
    .collection("users")
    .find({})
    .toArray((err, data) => {
      if (err) throw err;
      for (let i = 0; i < data.length; i++) {
        if (data[i].userName == req.body.userName) {
          res.json({ status: "user already exists" });
        } else {
          req.db.collection("users").insertOne(req.body, (err, data) => {
            if (err) throw err;
            res.json({ status: "Account successfully created" });
          });
        }
      }
    });
});
module.exports = router;
