const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  _id: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
