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
    Users.find({ where: { email: req.body.email } })
      //@Mordax - the user that was returned in bookshelf was an object. Caminte returns an array
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
          /*
          @Mordax 
          Due to Caminte returning an array, we have to change the user to 
          an object so the rest of code can continue to work.
          This is not a very elegant solution, we should change it later.
          */
          user = JSON.stringify(Object.assign({}, user));
          user = JSON.parse(user);

          bcrypt.compare(req.body.password, user[0].password, function(
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
                    email: user[0].email,
                    id: user[0].id
                  },
                  token: token
                }
              });
            } else {
              res.json({
                error: {
                  error: true,
                  message: "Email or Password is wrong wow"
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
            message: "POST /api/authenticate: " + error.message
          },
          code: "B120",
          data: {}
        });
      });
  });
};
