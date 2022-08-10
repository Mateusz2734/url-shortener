const express = require("express");
const router = express.Router();
const Url = require("../models/url.model");
const urlController = require("../controllers/url.controller")

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my URL shortener." });
});

router.get("/:_id", urlController.read);

module.exports = router;
