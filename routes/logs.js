const express = require("express");
const router = express.Router();
const logsController = require("../controller/logs");

router.get("/", logsController.getAllLogs);

module.exports = router;
