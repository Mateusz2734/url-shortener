const express = require("express");
const router = express.Router();
const getId = require("../utils/id.util");
const Url = require("../models/Url.model");
const urlController = require("../controllers/url.controller");

router.post("/", urlController.create);

module.exports = router;
