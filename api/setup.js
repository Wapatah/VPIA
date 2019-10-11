/*
@Matterwiki
This file contains all the endpoints related to users.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/

// @Matterwiki - Importing the models
var Users = require("../models/user.js");
var Topics = require("../models/topic.js");
var bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = function(app) {
  /*
  @Matterwiki
  This is a POST endpoint which takes the user name, email, password, and about to create
  a new user profile.
  It responds with the created user object in the data key.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.post("/setup", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      Users.create({
        id: 1,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        about: req.body.about
      })
        .then(function(collection) {
          Topics.create({ name: "general", description: "knowledge for everyone" })
            .then(function() {
              res.json({
                error: {
                  error: false,
                  message: ""
                },
                code: "B131",
                data: collection.toJSON()
              });
            })
            .catch(function() {
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
  });
};
