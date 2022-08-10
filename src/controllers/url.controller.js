const getId = require("../utils/id.util");
const Url = require("../models/url.model");

function create(req, res, next) {
  if (req.body.url) {
    const longUrl = req.body.url;
    const id = getId();

    const newUrl = new Url({ _id: id, url: longUrl, createdAt: Date.now() });

    newUrl
      .save()
      .then((obj) => {
        const fullUrl = `${req.protocol}://${req.get("host")}/${obj._id}`;
        res
          .status(200)
          .json({
            message: "Saved successfully",
            oldUrl: longUrl,
            newUrl: fullUrl,
          });
      })
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

function read(req, res, next) {
  Url.findOne(req.params)
    .then((obj) => res.redirect(obj.url))
    .catch((err) => {
      res.redirect("/404");
    });
}

module.exports = {
  create,
  read,
};
