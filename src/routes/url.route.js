const express = require("express");
const router = express.Router();
const getId = require("../utils/id.util");
const Url = require("../models/url.model");

router.post("/new", (req, res) => {
  if (req.body.url) {
    const longUrl = req.body.url;
    const id = getId();

    const newUrl = new Url({ _id: id, url: longUrl, createdAt: Date.now() });

    newUrl
      .save()
      .then((obj) =>
        res.status(200).json({ message: "Saved successfully", obj: obj })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });

    newUrl.save((err) => {
      if (err) {
        return;
      } else {
        return;
      }
    });

    // res.status(202).json({ url: req.body.url, shortUrl: fullUrl });
  } else {
    res.status(400).json({ error: "No url found" });
  }
});

module.exports = router;
