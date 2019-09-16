/*
@Matterwiki
This is main file which will contain all of our endpoints.
Once we have enough endpoints defined we start breaking them into modules for better code readability
*/

// @Matterwiki - Importing all the required libraries
var express = require("express");
// @Matterwiki - body parser to parse the request body
var bodyParser = require("body-parser");
var db = require("./config/db"); // eslint-disable-line
var app = express();
var fs = require("fs"); // eslint-disable-line
var apiRoutes = express.Router();
var apiRoutesAdmin = express.Router();
var jwt = require("jsonwebtoken");
var misc = require("./config/misc"); // eslint-disable-line
//@Matterwiki - config file in the app directory which contains the JWT key
var config = require("./config/config");

process.env.PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  // @Matterwiki - add some patchwork for the devserver to work!
  require("./config/webpack-middleware")(app);
}

app.set("superSecret", config.auth_secret); // secret variable

// @Matterwiki - Using the body parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", function(req, res) {
  // @Mordax - Should change this into a nice display
  res.send("List of API endpoints");
});

// Importing all endpoints for authentication
require("./api/authentication")(app);

// Importing the setup endpoint
require("./api/setup")(app);

// @Mordax - importing the users endpoint for sign up capabilties.
require("./api/users")(app);

apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks for expiration
    jwt.verify(token, app.get("superSecret"), function(err, decoded) {
      if (err) {
        return res.json({
          error: {
            error: true,
            message: "Failed to authenticate token"
          },
          code: "B101",
          data: {}
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).json({
      error: {
        error: true,
        message: "No token provided"
      },
      code: "B102",
      data: {}
    });
  }
});

apiRoutesAdmin.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks for expiration
    jwt.verify(token, app.get("superSecret"), function(err, decoded) {
      if (err) {
        return res.json({
          error: {
            error: true,
            message: "Failed to authenticate token"
          },
          code: "B101",
          data: {}
        });
      } else {
        if (decoded.id == 1) {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        } else {
          return res.status(403).json({
            error: {
              error: true,
              message: "You are not authorized to perform this action"
            },
            code: "BNOTADMIN",
            data: {}
          });
        }
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).json({
      error: {
        error: true,
        message: "No token provided"
      },
      code: "B102",
      data: {}
    });
  }
});

// Importing all endpoints for articles
require("./api/articles")(apiRoutes);

// Importing all endpoints for topics
require("./api/topics")(apiRoutes);

// Importing all endpoints for users
require("./api/users")(apiRoutesAdmin);

// Importing all endpoints for archives
require("./api/archives")(apiRoutes);

// Importing the search endpoint
require("./api/search")(apiRoutes);

// Importing all endpoints which are only admin accessible
require("./api/admin")(apiRoutesAdmin);

app.use("/api", apiRoutes);
app.use("/api", apiRoutesAdmin);

app.use(express.static(__dirname + "/client"));

app.listen(process.env.PORT, function() {
  console.log("Running on http://localhost:%s", process.env.PORT);
});
