const express = require("express");
const router = express.Router();
const getId = require("../utils/id.util");

router.use((req, res, next) => {
  if (req.body.url) {
    console.log(req.body.url)
    const id = getId();
    const fullUrl = `${req.protocol}://${req.get("host")}/${id}`;
    console.log(fullUrl);
    res.status(202).json({ url: req.body.url, shortUrl: fullUrl });
  } else {
    res.status(400).json({ error: "No url found" });
  }
});

router.post("/new", (req, res) => {});

module.exports = router;
