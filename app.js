const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mainRoute = require('./src/routes/main.route')
const urlRoute = require('./src/routes/url.route')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", mainRoute)
app.use("/url", urlRoute)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
