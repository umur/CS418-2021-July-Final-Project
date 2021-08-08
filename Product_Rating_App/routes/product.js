const express = require("express");
const router = express.Router();
const authConroller = require("../controller/authController");

router.get("/", (req, res, next) => {
  res.json("ready to get");
});
router.get("/:name", (req, res, next) => {
  res.json("ready to get with name");
});
router.post("/", (req, res, next) => {
  res.json("ready to post");
});
router.put("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  res.json("ready to update");
});
router.delete("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  res.json("ready to delete");
});

module.exports = router;
