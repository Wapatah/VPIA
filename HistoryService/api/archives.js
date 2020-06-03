/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all endpoints related to archives.
  POST and DELETE are handled when an Article is created/destroyed, since
  the archive tracks updates to Articles. 
  Archives cannot be updated with PUT.
*/

// Importing the data models needed to manipulate
var Archives = require("../models/archive.js");
var Users = require("../../UserService/models/user.js");

module.exports = function(app) {
  /* --------------------------------------------------------------------------------------------------------------------------------------------
  GET /archive/:id - endpoint that responds with one archive of the 
  specific ID (identified through the ID param)
*/
  app.get("/archives/:id/", function(req, res) {
    Archives.find({ where: { id: req.params.id } })
      .then(function(archive) {
        Users.find({ where: { id: archive[0].user_id } })
          .then(function(user) {
            archive[0].users(user);
          })
          .then(function() {
            res.json({
              error: {
                error: false,
                message: ""
              },
              code: "B113",
              data: archive
            });
          });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "GET: /archives/:id " + error.message
          },
          code: "B114",
          data: {}
        });
      });
  });
};
