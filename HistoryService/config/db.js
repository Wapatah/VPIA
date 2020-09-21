const caminte = require("caminte");
const Schema = caminte.Schema;

const config = {
  driver: "mysql",
  host: "localhost",
  username: "wapataho_vpia",
  password: "Wapatah1",
  database: "wapataho_vpia",
  pool: true
};

const schema = new Schema(config.driver, config);

module.exports = schema;
