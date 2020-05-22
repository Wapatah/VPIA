/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all the endpoints related to users.
*/

// Importing the data models needed to manipulate
var Users = require("../models/user.js");
var bcrypt = require("bcryptjs");
var Articles = require("../../models/article.js");
const saltRounds = 10;

module.exports = function(app) {
  //--------------------------------------------------------------------------------------------------------------------------------------------
  // GET /users - GET ALL endpoint that responds with the list of all the users in the users table
  app.get("/users", function(req, res) {
    Users.all({ where: {} })
      .then(function(collection) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B133",
          data: collection
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "GET /users: " + error.message
          },
          code: "B134",
          data: {}
        });
      });
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // GET /users/:id - GET ONE endpoint that responds with the user (with the given id)
  app.get("/users/:id", function(req, res) {
    Users.find({ where: { id: req.params.id } })
      .then(function(user) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B133",
          data: user
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "GET /use/:id/: " + error.message
          },
          code: "B134",
          data: {}
        });
      });
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
    POST /users - POST endpoint which takes the user name, email, password, and about to create
    a new user profile.
  */
  app.post("/users", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      Users.create({
        admin: false,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        about: req.body.about
      })
        .then(function(collection) {
          res.json({
            error: {
              error: false,
              message: ""
            },
            code: "B131",
            data: collection.toJSON()
          });
        })
        .catch(function(error) {
          res.status(500).json({
            error: {
              error: true,
              message: "POST /users: " + error.message
            },
            code: "B132",
            data: {}
          });
        });
    });
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
    PUT /users - PUT endpoint which takes the user's ID, name, email, password, and about to create
    a update the user profile of the given ID.
  */
  app.put("/users", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      Users.update(
        {
          id: req.body.id
        },
        {
          name: req.body.name,
          email: req.body.email,
          password: hash,
          about: req.body.about
        }
      )
        .then(function() {
          res.json({
            error: {
              error: false,
              message: ""
            },
            code: "B135",
            data: {
              name: req.body.name,
              email: req.body.email,
              about: req.body.about
            }
          });
        })
        .catch(function(error) {
          res.status(500).json({
            error: {
              error: true,
              message: "PUT /users: " + error.message
            },
            code: "B136",
            data: {}
          });
        });
    });
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // DELETE /users - endpoint for deleting a user from the database.
  app.delete("/users", function(req, res) {
    Users.destroyById(req.body.id)
      .then(function() {
        Articles.find({ where: { user_id: req.body.id } }).then(collection => {
          if (collection) {
            Articles.update(
              {
                where: {
                  user_id: req.body.id
                }
              },
              {
                user_id: 1
              }
            )
              .then(() => {
                res.json({
                  error: {
                    error: false,
                    message: ""
                  },
                  code: "B127",
                  data: {}
                });
              })
              .catch(error => {
                res.status(500).json({
                  error: {
                    error: true,
                    message:
                      "DELETE /users (failed to move Articles): " +
                      error.message
                  },
                  code: "",
                  data: {}
                });
              });
          } else {
            res.json({
              error: {
                error: false,
                message: ""
              },
              code: "B127",
              data: {}
            });
          }
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "DELETE /users: " + error.message
          },
          code: "B128",
          data: {}
        });
      });
  });
};
