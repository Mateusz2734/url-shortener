const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
const url = require("./src/models/url.model");
mongoose.connect(
  `mongodb+srv://mateusz:${process.env.PASSWORD}@cluster0.eq4whaf.mongodb.net/urlshortener?retryWrites=true&w=majority`
);

const newUrl = new url({
  _id: 3,
  url: "https://www.facebook.com",
  shortUrl: "/aasad5",
  createdAt: Date.now(),
});

newUrl
  .save()
  .then((obj) => console.log(obj))
  .catch((err) => console.log(err));
