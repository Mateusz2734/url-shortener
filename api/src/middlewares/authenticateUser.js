const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (jwt.decode(token).username !== req.params.username) {
    res
      .status(403)
      .json({ message: "You are requesting other users personal profile" });
  } else {
    next();
  }
}

module.exports = authenticateUser;
