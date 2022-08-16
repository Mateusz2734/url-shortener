const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const modelFunctions = require("../utils/models.util");
const authenticateToken = require("../middlewares/authenticateToken");
const authenticateUser = require("../middlewares/authenticateUser");
const getId = require("../utils/id.util");
const router = express.Router();
const jwt = require("jsonwebtoken");

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
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
});

router.get("/login", (req, res) => {
  res.json({ message: "You need to login" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple Validation

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Not all fields have been entered" });
    }

    // Trying to find the User in Db
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Checking entered password  and comparing with password in Db
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      // tokenUser.toJSON(),
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.header("auth-token", accessToken).json({
      accessToken: accessToken,
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

router.get("/secret", authenticateToken, (req, res) => {
  res.json({ message: "This is my little secret" });
});

router.get(
  "/:username",
  authenticateToken,
  authenticateUser,
  async (req, res) => {
    const username = req.params.username;
    try {
      const foundUser = await User.findOne({ username: username });
      res.status(200).json({ email: foundUser.email, urls: foundUser.urls });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }
);

router.post(
  "/:username",
  authenticateToken,
  authenticateUser,
  async (req, res) => {
    const username = req.params.username;
    const { shortUrl, url } = req.body;

    try {
      const newUrl = await modelFunctions.createUrlMadeByUser(username, {
        shortUrl: shortUrl,
        url: url,
        createdAt: Date.now(),
      });
      res.status(200).json({ url: newUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
