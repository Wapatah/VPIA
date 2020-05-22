/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains the search endpoint.
  As of now search is based on the basic LIKE query in SQLite and MySQL.
  Further improvements to the search feature should be moved to this file.

  TODO: Allow searches by different variables
*/

// Importing the data models needed to manipulate
var Articles = require("../../models/article.js");

module.exports = function(app) {
  /* --------------------------------------------------------------------------------------------------------------------------------------------
  GET /search - This is a GET endpoint which takes the search query as a URL param
  Runs the search query and returns matching articles in the data key in the
  response object.
  Returns items using "like" search query (e.g. 'pipe' can return 'panel pipe')
*/
  app.get("/search", function(req, res) {
    var SearchInput = req.query.query;
    Articles.find({
      where: {
        or: [
          {
            artwork_type: { regex: SearchInput }
          },
          {
            culture_group: { regex: SearchInput }
          },
          {
            institution: { regex: SearchInput }
          },
          {
            material: { regex: SearchInput }
          },
          {
            tags: { regex: SearchInput }
          }
        ]
      }
    })
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
