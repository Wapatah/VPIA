/*
  The Database config file. This is were Caminte (an database agnostic Javascript ORM)
  is configured. If you require a different database, Caminte's github has
  examples of how to specify configs for various drivers.
  Caminte supports SQL (like MySQL), and NoSQL (like Mongo and Neo4j).

  Warning: Caminte has not been updated - some adapters are not properly working.
  We can confirm that MySQL and Mongo switches work.
*/
const caminte = require("caminte");
const Schema = caminte.Schema;
require("dotenv").config();

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
