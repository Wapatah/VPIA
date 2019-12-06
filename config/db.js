/* 
@Mordax
The Database config file. This is were Caminte (an database agnostic Javascript ORM)
is configured. If you require a different database, Caminte's github has 
examples of how to specify configs for various drivers.
Caminte supports SQL (like MySQL), and NoSQL (like Mongo and Neo4j).
*/
var caminte = require("caminte");
var Schema = caminte.Schema;

var config = {
  driver: "mysql",
  host: "vpia.wapatah.com",
  username: "wapataho_vpia",
  password: "Wapatah1",
  database: "wapataho_vpia",
  pool: true
};

var schema = new Schema(config.driver, config);

module.exports = schema;
