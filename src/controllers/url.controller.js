const getId = require("../utils/id.util");
const Url = require("../models/url.model");

async function create(req, res, next) {
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
  } else {
    res.status(400).json({ error: "No url found" });
  }
}

async function read(req, res, next) {
  Url.findOne(req.params)
    .then((obj) => res.redirect(obj.url))
    .catch((err) => console.log(err));
}

module.exports = {
  create,
  read,
};
