const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  _id: String,
  url: String,
  shortUrl: String,
  createdAt: Date,
});

const url = mongoose.model("Url", urlSchema);

module.exports = url;