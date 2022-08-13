const User = require("../models/User.model");

functions = {
  createUser: async (user) => {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      console.log("Error while creating User:\n", error);
    }
  },

  createUrl: async (userId, url) => {
    try {
      const newUrl = await Url.create(url);
      const userDocument = await User.findById(userId);
      userDocument.urls.push(newUrl);
      await userDocument.save();
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
