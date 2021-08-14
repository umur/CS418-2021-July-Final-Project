const express = require("express");
const path = require("path");
const router = express.Router();
const jwtManager = require("../jwt");

//login method
router.post("/signin", (req, res, next) => {
  req.db
    .collection("users")
    .find({})
    .toArray((err, data) => {
      if (err) throw err;
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].userName == req.body.userName &&
          data[i].password == req.body.password &&
          data[i].status == "active"
        ) {
          const payload = {};
          payload.userName = req.body.userName;
          payload.role = req.body.role;
          const token = jwtManager.generate(payload);
          res.json({ result: token, status: "success" });
          return;
        }
      }
      res.json({ status: "Try-again" });
    });
});

//db/fs find email and password in the database

module.exports = router;
