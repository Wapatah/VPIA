/*
@Matterwiki
This file contains all the endpoints related to user authentication.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/

// @Matterwiki - Importing the models
var Users = require("../models/user.js");
var jwt = require("jsonwebtoken"); // @Matterwiki - used to create, sign, and verify tokens
var bcrypt = require("bcryptjs");

module.exports = function(app) {
  /*
  @Matterwiki
  This is a POST endpoint that takes the email and password and returns the JWT
  the token is present in the token key in the data object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.post("/api/authenticate", function(req, res) {
    Users.forge({ email: req.body.email })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.json({
            error: {
              error: true,
              message: "User not found"
            },
            code: "B117",
            data: {}
          });
        } else {
          user = user.toJSON();
          bcrypt.compare(req.body.password, user.password, function(
            err,
            result
          ) {
            if (result == true) {
              var token = jwt.sign(user, app.get("superSecret"), {
                expiresIn: 86400
              });
              res.json({
                error: {
                  error: false,
                  message: ""
                },
                code: "B118",
                data: {
                  user: {
                    email: user.email,
                    id: user.id
                  },
                  token: token
                }
              });
            } else {
              res.json({
                error: {
                  error: true,
                  message: "Email or Password is wrong"
                },
                code: "B119",
                data: {}
              });
            }
          });
        }
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: "B120",
          data: {}
        });
      });
  });
};
