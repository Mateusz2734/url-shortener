const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const urlController = require("../controllers/url.controller");
const modelFunctions = require("../utils/models.util");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to User route" });
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if User with given email exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }

    // Create the User
    const createdUser = await modelFunctions.createUser({
      email: email,
      username: username,
      password: password,
    });
    res.status(200).json({
      message: "Registered Successfully",
      user: {
        id: createdUser._id,
        email: createdUser.email,
        username: createdUser.username,
      }
      
      
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple Validation

    if (!email || !password) {
      return res.status(400).json({ message: "Not all fields have been entered" });
    }

    // Trying to find the User in Db
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials" });
    }

    // Checking entered password  and comparing with password in Db
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;
