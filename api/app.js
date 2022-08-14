const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require('cors')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())

mongoose.connect(require("./src/configs/db.config")).catch((err) => console.log(err));

app.use(bodyParser.json())

app.use("/url", require("./src/routes/url.route"));
app.use("/users", require("./src/routes/users.route"));
app.use("/", require("./src/routes/main.route"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
