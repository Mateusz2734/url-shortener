const { nanoid, customAlphabet } = require("nanoid");

function getId() {
  const nanoid = customAlphabet(
    "useandom26T198340PX75pxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict",
    6
  );
  return nanoid();
}

module.exports = getId;
