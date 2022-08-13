const mongoose = require("mongoose");

const Url = mongoose.model(
  "Url",
  new mongoose.Schema({
    shortUrl: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, required: true },
  })
);

module.exports = Url;
