// @Matterwiki - requiring the knexfile that contains our connection object.
var config = require("./knexfile.js");
// @Matterwiki - imports knex with our connection object (found in knexfile).
var knex = require("knex")(config);
// @Matterwiki - imports bookshelf along with our knex config.
var bookshelf = require("bookshelf")(knex);

// @Matterwiki - Exporting the bookshelf module for use in other files.
module.exports = bookshelf;
