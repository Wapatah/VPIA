/*
@Matterwiki
The development object is the connection object for the development database.
We need to create more for different environments (production, testing, staging).

@Mordax
Moved all the db configuration to this file to lower file jumping.
*/
var config = 
module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "wapatah1",
    database: "myapp_test"
  },
  useNullAsDefault: true
};
  
// @Matterwiki - imports knex with our connection object (found in knexfile).
var knex = require("knex")(config);

// @Matterwiki - Export the knex library for use. All knex commands remain the same.
module.exports = knex;

// @Matterwiki - Run the latest DB migrations whenever the server starts.
knex.migrate.latest([config]);

// @Matterwiki - imports bookshelf along with our knex config.
var bookshelf = require("bookshelf")(knex);

// @Matterwiki - Exporting the bookshelf module for use in other files.
module.exports = bookshelf;
