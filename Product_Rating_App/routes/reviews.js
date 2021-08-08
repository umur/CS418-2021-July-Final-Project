const express = require("express");
const router = express.Router();
const authConroller = require("../controller/authController");

router.get("/:name", (req, res, next) => {
  res.json("fetching review for product a");
});
router.post("/", (req, res, next) => {
  res.json("posting review for product a");
});
router.put("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  res.json("updating review for product a");
});
router.delete("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  res.json("deleting review for product a");
});

module.exports = router;
