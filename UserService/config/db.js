const caminte = require("caminte");
const Schema = caminte.Schema;
require("dotenv").config({ path: "../.env" });

const config = {
  driver: "mariadb",
  host: "localhost",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "wapataho_vpia",
  pool: true
};

const schema = new Schema(config.driver, config);

module.exports = schema;
