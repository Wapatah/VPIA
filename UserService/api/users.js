/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all the endpoints related to users.
*/

// Importing the data models needed to manipulate
const Users = require("../models/user.js");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { isUserAuthenticated, isAdminAuthenticated } = require("../index.js");

module.exports = app => {
  //--------------------------------------------------------------------------------------------------------------------------------------------
  // GET /users - GET ALL endpoint that responds with the list of all the users in the users table
  app.get("/users", async (req, res) => {
    try {
      const user = await Users.all({
        // Fields only select the variables we want to look at.
        fields: [
          "admin",
          "id",
          "name",
          "email",
          "about",
          "group",
          "position",
          "education",
          "land"
        ],
        where: {}
      });
      res.json({
        error: {
          error: false
        },
        data: user
      });
    } catch (err) {
      res.status(500).json({
        error: {
          error: true,
          message: "GET /users: " + err.message
        },
        data: {}
      });
    }
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // GET /users/:id - GET ONE endpoint that responds with the user (with the given id)
  app.get("/users/:id", async (req, res) => {
    try {
      const user = await Users.find({
        fields: [
          "admin",
          "id",
          "name",
          "email",
          "about",
          "group",
          "position",
          "education",
          "land"
        ],
        where: { id: req.params.id }
      });
      res.json({
        error: {
          error: false
        },
        data: user
      });
    } catch (err) {
      res.status(500).json({
        error: {
          error: true,
          message: "GET /users/:id/: " + err.message
        },
        data: {}
      });
    }
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
    POST /users - POST endpoint which takes the user name, email, password, and about to create
    a new user profile.
  */
  app.post("/users", async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      try {
        const user = Users.create({
          admin: false,
          name: req.body.name,
          email: req.body.email,
          password: hash,
          group: req.body.group,
          position: req.body.position,
          organization: req.body.organization,
          education: req.body.education
        });
        res.json({
          error: {
            error: false
          },
          data: user
        });
      } catch (err) {
        res.status(500).json({
          error: {
            error: true,
            message: "POST /users: " + err.message
          },
          data: {}
        });
      }
    });
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
    PUT /users - PUT endpoint which takes the user's ID, name, email, password, and about to create
    a update the user profile of the given ID.
  */
  app.put("/users", isAdminAuthenticated, async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      try {
        const user = await Users.update(
          {
            id: req.body.id
          },
          {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            about: req.body.about
          }
        );
        res.json({
          error: {
            error: false
          },
          data: {
            name: req.body.name,
            email: req.body.email,
            about: req.body.about
          }
        });
      } catch (err) {
        res.status(500).json({
          error: {
            error: true,
            message: "PUT /users: " + err.message
          },
          data: {}
        });
      }
    });
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
    PUT /users/password - PUT endpoint which takes the user's ID, and password and changes the password.
  */
  app.put("/users/password", async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      try {
        const user = await Users.update(
          {
            id: req.body.id
          },
          {
            password: hash
          }
        );
        res.status(200).json({
          error: {
            error: false
          }
        });
      } catch (err) {
        res.status(500).json({
          error: {
            error: true,
            message: "PUT /users/password: " + err.message
          },
          data: {}
        });
      }
    });
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // DELETE /users - endpoint for deleting a user from the database.
  app.delete("/users", isAdminAuthenticated, async (req, res) => {
    try {
      const user = await Users.destroyById(req.body.id);
      res.json({
        error: {
          error: false
        },
        data: {}
      });
    } catch (err) {
      res.status(500).json({
        error: {
          error: true,
          message: "DELETE /users: " + err.message
        },
        data: {}
      });
    }
  });
};
