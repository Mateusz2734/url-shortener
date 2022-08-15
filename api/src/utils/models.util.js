const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

functions = {
  createUser: async (user) => {
    try {
      const { email, username, password } = user;

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        email: email,
        username: username,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      console.log("Error while creating User:\n", error);
    }
  },

  createUrlMadeByUser: async (userId, url) => {
    try {
      const newUrl = await Url.create(url);
      const userDocument = await User.findById(userId);
      userDocument.urls.push(newUrl);
      await userDocument.save();
      return newUrl;
    } catch (error) {
      console.log("Error while creating custom Url:\n", error);
    }
  },

  createUrl: async (url) => {
    try {
      const newUrl = await Url.create(url);
      return newUrl;
    } catch (error) {
      console.log("Error while creating Url:\n", error);
    }
  },

  getAllUrlsOfUser: async (id) => {
    const userUrlObjects = await User.findById(id).populate("urls");
    const allUserUrls = userUrlObjects.urls.map((obj) => obj.url);
    return allUserUrls;
  },
};

module.exports = functions;
