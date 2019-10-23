/*
@Matterwiki
This file contains all endpoints related to archives
*/

var Archives = require("../models/archive.js");
var Users = require("../models/user.js");

module.exports = function(app) {
  /*
  @Matterwiki
  This is a GET endpoint that responds with one article of the specific ID (identified through the ID param)
  the article is present in the data object in the returning object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.get("/archives/:id/", function(req, res) {
    Archives.find({ where: { id: req.params.id } })
      .then(function(archive) {
        Users.create({ id: archive[0].user_id });
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
            message:  "GET /archives/:id/: " + error.message
          },
          code: "B114",
          data: {}
        });
      });
  });
};
