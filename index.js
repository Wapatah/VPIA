/*
  This is main file which will contain all platform endpoints.
*/

// Importing all the required libraries
var express = require("express");
var compression = require("compression"); // Adding middleman compression scheme for performance
var bodyParser = require("body-parser"); // body parser to parse the request body
var db = require("./config/db"); // eslint-disable-line
var app = express();
var fs = require("fs"); // eslint-disable-line
var apiRoutes = express.Router();
var apiRoutesAdmin = express.Router();
var jwt = require("jsonwebtoken");

// Loading and mapping data model relationships - allows jumping between NoSQL and SQL.
var relations = require("./models/relations");
relations.load(app);

// Using gzip compression to speed up app performance
app.use(compression());

process.env.PORT = process.env.PORT || 30000;
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  // Add some patchwork for the devserver to work!
  require("./config/webpack-middleware")(app);
}

app.set("superSecret", process.env.AUTH_SECRET); // Secret variable, set in Jenkins env variables

// Using the body parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", function(req, res) {
  // Should change this into a nice display
  res.send("List of API endpoints");
});

// Importing all endpoints for authentication
require("./api/authentication")(app);

// Importing the setup endpoint
require("./api/setup")(app);

// Importing the users endpoint for sign up capabilties.
require("./api/users")(app);

// Limit the ability of non-users to access API routes.
apiRoutes.use(function(req, res, next) {
  // Check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // Decode token
  if (token) {
    // Verifies secret and checks for expiration
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
        // If everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // If there is no token, return an error
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

// Limit the ability of non-admin users to access API routes.
apiRoutesAdmin.use(function(req, res, next) {
  // Check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // Decode token
  if (token) {
    // Verifies secret and checks for expiration
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
        if (decoded[0].admin) {
          // If everything is good, save to request for use in other routes
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
    // If there is no token, return an error
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
  console.log("Running on http://localhost:" + process.env.PORT);
});
