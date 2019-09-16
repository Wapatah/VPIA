// @Matterwiki - requiring the knexfile that contains our connection object.
var config = require("../config/knexfile.js");
// @Matterwiki - imports knex with our connection object (found in knexfile).
var knex = require("knex")(config);

// @Matterwiki - Export the knex library for use. All knex commands remain the same.
module.exports = knex;

// @Matterwiki - Run the latest DB migrations whenever the server starts.
knex.migrate.latest([config]);
