var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/users", (req, res) => {
  req.db
    .collection("users")
    .find({})
    .toArray((err, data) => {
      if (err) throw err;
      res.json(data);
    });
});
router.put("/users/:userName", (req, res) => {
  if (req.body.status) {
    req.db
      .collection("users")
      .updateOne(
        { userName: req.params.userName },
        { $set: { status: req.body.status } },
        (err, data) => {
          if (err) throw err;
          res.json({ status: data });
        }
      );
  } else {
    req.db
      .collection("users")
      .updateOne(
        { userName: req.params.userName },
        { $set: { password: req.body.password } },
        (err, data) => {
          if (err) throw err;
          res.json({ status: data });
        }
      );
  }
});

module.exports = router;
//db.users.updateOne({"userName": "challa"}, {$set: {"status": "active"}})
