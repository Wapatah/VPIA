/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains the endpoint to setting up the initial Admin user
*/

// @Matterwiki - Importing the models
const Users = require("../models/user.js");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = app => {
  /* --------------------------------------------------------------------------------------------------------------------------------------------
  POST /setup - This is a POST endpoint which takes the user name, email, password, and about to create
  a new user profile.
*/
  app.post("/setup", async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      try {
        const user = await Users.create({
          admin: true,
          name: req.body.name,
          email: req.body.email,
          password: hash,
          about: req.body.about
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
            message:
              "There was an error creating the admin user. Chances are you've already set up | " +
              err.message
          },
          data: {}
        });
      }
    });
  });
};
