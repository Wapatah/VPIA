/* 
  The Database config file. This is were Caminte (an database agnostic Javascript ORM)
  is configured. If you require a different database, Caminte's github has 
  examples of how to specify configs for various drivers.
  Caminte supports SQL (like MySQL), and NoSQL (like Mongo and Neo4j).

  Warning: Caminte has not been updated in a year - some adapters are not properly working.
  We can confirm that MySQL and Mongo switches work. 

  Note: The process.env.VARIABLES below are set in our Jenkins instance as environment variables.
*/
var caminte = require("caminte");
var Schema = caminte.Schema;

var config = {
  driver: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

var schema = new Schema(config.driver, config);

module.exports = schema;
