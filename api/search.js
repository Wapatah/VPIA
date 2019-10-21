/*
@Matterwiki
This file contains the search endpoint.
As of now search is based on the basic LIKE query in SQLite and MySQL.
Further improvements to the search feature should be moved to this file.

Why aren't we using Algolia or ElasticSearch?

Matterwiki wants to keep things simple. Setting up a ES instance or signing up
for Algolia goes against that.
*/

var Articles = require("../models/article.js");

module.exports = function(app) {
  /*
  @Matterwiki
  This is a GET enpoint which takes the search query as a URL param
  Runs the search query and returns matching articles in the data key in the
  response object.
  The endpoint only searches article titles as of now.
  */
  app.get("/search", function(req, res) {
    var SearchInput = req.query.query;
    Articles.find({ where: { title: SearchInput } })
      .then(function(collection) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B131",
          data: collection
        });
      })
      .catch(function() {
        res.status(500).json({
          error: {
            error: true,
            message:
              "There was an error performing the search operation. Please try again."
          },
          code: "B132",
          data: {}
        });
      });
  });
};
