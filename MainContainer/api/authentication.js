/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all the endpoints related to user authentication.
*/

// Importing the data models needed to manipulate
var Users = require("../../UserService/models/user.js");
var jwt = require("jsonwebtoken"); // Used to create, sign, and verify tokens
var bcrypt = require("bcryptjs"); // Password hashing function

module.exports = function(app) {
  /* --------------------------------------------------------------------------------------------------------------------------------------------
  POST /authentication - endpoint that takes the email and password and returns the JWT
  the token is present in the token key in the data object.
*/
  app.post("/api/authenticate", function(req, res) {
    /* 
  > Migration note:
  The original ORM the Matterwiki code was based (Bookshelf) on was changed to Caminte.
  The User that was returned in bookshelf was an object. Caminte returns an array.
*/
    Users.find({ where: { email: req.body.email } })
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
            > Migration note:
            Due to Caminte returning an array, we have to change the user to 
            an object so the rest of the original Matterwiki code can continue to work.
            This is not a very elegant solution, we should change it if
            there's a better approach.
          */
          user = JSON.stringify(Object.assign({}, user));
          user = JSON.parse(user);

          /* 
            Compare the hashes of the password found in the database versus
            the given password by the user.
          */
          bcrypt.compare(req.body.password, user[0].password, function(
            err,
            result
          ) {
            if (result === true) {
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
                    id: user[0].id,
                    admin: user[0].admin
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
            message: "POST /api/authenticate: " + error.message
          },
          code: "B120",
          data: {}
        });
      });
  });
};
