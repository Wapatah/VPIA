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
  driver: "mysql", // or mariadb
  host: "localhost",
  port: "3306",
  username: "root",
  password: "wapatah1",
  database: "myapp_test",
  pool: true // optional for use pool directly
};

var schema = new Schema(config.driver, config);

module.exports = schema;
