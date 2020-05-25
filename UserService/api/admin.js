/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all the endpoints which are accessible only to the admin.
  The endpoints are
  GET /users
  POST /users
  PUT  /users
  DELETE  /users
  NOTE:
  The above users endpoints are not present in this file as they are all the users
  endpoints this API has, they are present in a separate file, users.js
  All those still come under the ADMIN endpoints

  The rest of the endpoints:
  DELETE /articles
*/

// Importing the data models needed to manipulate
var Articles = require("../../WikiService/models/article.js");

module.exports = function(app) {
  // --------------------------------------------------------------------------------------------------------------------------------------------
  // DELETE /articles - remove article
  app.delete("/articles", function(req, res) {
    Articles.destroyById(req.body.id)
      .then(function() {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B109",
          data: {}
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "DELETE /articles: " + error.message
          },
          code: "B110",
          data: {}
        });
      });
  });
};
