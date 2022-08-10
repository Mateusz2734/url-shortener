const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mainRoute = require("./src/routes/main.route");
const urlRoute = require("./src/routes/url.route");
const url = require("./src/configs/db.config");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(url).catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", mainRoute);
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
