const express = require("express");
const router = express.Router();
const fetchController = require("../DB/fetchController");

router.post("/", fetchController.fetchData);

module.exports = router;