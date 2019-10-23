/*
@Matterwiki
This file contains all the endpoints related to users.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/

// @Matterwiki - Importing the models
var Users = require("../models/user.js");
var bcrypt = require("bcryptjs");
var Articles = require("../models/article.js");
const saltRounds = 10;

module.exports = function(app) {
  /*
  @Matterwiki
  This is a POST endpoint which takes the user name, email, password, and about to create
  a new user profile.
  It responds with the created user object in the data key.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.post("/users", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      Users.create({
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

  app.get("/users", function(req, res) {
    /*
    This is a GET endpoint that responds with the list of all the topics in the topics table
    the topics are present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
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

  /*
  @Matterwiki
  This is a PUT endpoint which takes the user's ID, name, email, password, and about to create
  a update the user profile of the given ID.
  It responds with the updated user object in the data key.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.put("/users", function(req, res) {
    if (req.body.password != null) {
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
                message: "PUT /users (with password): " + error.message
              },
              code: "B136",
              data: {}
            });
          });
      });
    } else {
      Users.update(
        {
          id: req.body.id
        },
        {
          name: req.body.name,
          email: req.body.email,
          about: req.body.about
        }
      )
        .then(function(collection) {
          res.json({
            error: {
              error: false,
              message: ""
            },
            code: "B135",
            data: collection
          });
        })
        .catch(function(error) {
          res.status(500).json({
            error: {
              error: true,
              message: "PUT /users (no password): " + error.message
            },
            code: "B136",
            data: {}
          });
        });
    }
  });

  /*
  @Matterwiki
  This is a DELETE endpoint for delete a user from the database.
  It takes the id of the user and then deletes that record from the database.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
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
                    message:  "DELETE /users (failed to move Articles): " + error.message
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
            message:  "DELETE /users: " + error.message
          },
          code: "B128",
          data: {}
        });
      });
  });

  /*
  This is a GET endpoint that responds with the user (with the given id)
  the user is present in the data object in the returning object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
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
};
