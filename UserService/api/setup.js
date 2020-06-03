/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains the endpoint to setting up the initial Admin user
*/

// @Matterwiki - Importing the models
var Users = require("../models/user.js");
var bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = function(app) {
  /* --------------------------------------------------------------------------------------------------------------------------------------------
  POST /setup - This is a POST endpoint which takes the user name, email, password, and about to create
  a new user profile.
*/
  app.post("/setup", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      Users.create({
        admin: true,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        about: req.body.about
      }).catch(function() {
        res.status(500).json({
          error: {
            error: true,
            message:
              "There was an error creating the admin user. Chances are you've already set up"
          },
          code: "B132",
          data: {}
        });
      });
    });
  });
};
