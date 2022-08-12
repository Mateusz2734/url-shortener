const express = require("express");
const router = express.Router();
const Url = require("../models/Url.model");
const urlController = require("../controllers/url.controller");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my URL shortener." });
});

router.get("/404", (req, res) => {
  res
    .status(404)
    .json({
      message: "The page you were looking for doesn't exist in our database",
    });
});

router.get("/:_id", urlController.read);

module.exports = router;
