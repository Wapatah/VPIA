const caminte = require("caminte");
const Schema = caminte.Schema;

const config = {
  driver: "mariadb",
  host: "localhost",
  username: "root",
  password: "wapatahartworkland",
  database: "wapataho_vpia",
  pool: true
};

const schema = new Schema(config.driver, config);

module.exports = schema;
