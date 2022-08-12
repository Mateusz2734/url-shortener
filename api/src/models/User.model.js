const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  urls: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Url",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
