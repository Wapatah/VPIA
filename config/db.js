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
  host: "gi6kn64hu98hy0b6.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  username: "tkyjt1pvbjecbj2n",
  password: "nrwupab524u7owc5",
  database: "ye8p13gb0y2efvv0",
  pool: true
};

var schema = new Schema(config.driver, config);

module.exports = schema;
