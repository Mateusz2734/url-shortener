const { nanoid } = require("nanoid");

function getId() {
  return nanoid(6);
}

module.exports = getId;
