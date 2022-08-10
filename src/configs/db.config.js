require("dotenv").config();

const cfg = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  cluster: "cluster0.eq4whaf",
  db: "urlshortener",
  query: "retryWrites=true&w=majority",
};

const dbUrl = `mongodb+srv://${cfg.username}:${cfg.password}@${cfg.cluster}.mongodb.net/${cfg.db}?${cfg.query}`;

module.exports = dbUrl;
