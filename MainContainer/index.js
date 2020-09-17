/*
  This is main file which will contain all platform endpoints.
*/

// Importing all the required libraries
let express = require("express");
let compression = require("compression"); // Adding middleman compression scheme for performance
let bodyParser = require("body-parser"); // body parser to parse the request body
let db = require("./config/db"); // eslint-disable-line
let app = express();
let fs = require("fs"); // eslint-disable-line
let apiRoutes = express.Router();
let apiRoutesAdmin = express.Router();
let jwt = require("jsonwebtoken");
require("dotenv").config();

// Using gzip compression to speed up app performance
app.use(compression());

process.env.PORT = process.env.PORT || 30000;
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  // Add some patchwork for the devserver to work!
  require("./config/webpack-middleware")(app);
}

app.set("superSecret", process.env.AUTH_SECRET); // Secret variable

// Using the body parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", function(req, res) {
  // Should change this into a nice display
  res.send("List of API endpoints");
});

// Importing all endpoints for authentication
require("../UserService/api/authentication")(app);

// Importing the setup endpoint
require("../UserService/api/setup")(app);

// Importing the users endpoint for sign up capabilties.
require("../UserService/api/users")(app);

// Limit the ability of non-users to access API routes.
module.exports = function isUserAuthenticated(req, res, next) {
  // Check header or url parameters or post parameters for token
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // Decode token
  if (token) {
    // Verifies secret and checks for expiration
    jwt.verify(token, app.get("superSecret"), function(err, decoded) {
      if (err) {
        res.json({
          error: {
            error: true,
            message: "Failed to authenticate token"
          },
          code: "B101",
          data: {}
        });
        res.redirect("/");
      } else {
        // If everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // If there is no token, return an error
    res.status(403).json({
      error: {
        error: true,
        message: "No token provided"
      },
      code: "B102",
      data: {}
    });
    res.redirect("/");
  }
};

// Limit the ability of non-admin users to access API routes.
module.exports = function isAdminAuthenticated(req, res, next) {
  // Check header or url parameters or post parameters for token
  let token =
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
          res.status(403).json({
            error: {
              error: true,
              message: "You are not authorized to perform this action"
            },
            code: "BNOTADMIN",
            data: {}
          });
          res.redirect("/");
        }
      }
    });
  } else {
    // If there is no token, return an error
    res.status(403).json({
      error: {
        error: true,
        message: "No token provided"
      },
      code: "B102",
      data: {}
    });
    res.redirect("/");
  }
};

// Importing all endpoints for articles
require("../WikiService/api/articles")(apiRoutes);

// Importing all endpoints for users
require("../UserService/api/users")(apiRoutesAdmin);

// Importing the search endpoint
require("../SearchService/api/search")(apiRoutes);

app.use("/api", apiRoutes);
app.use("/api", apiRoutesAdmin);

app.use(express.static(__dirname + "/client"));

app.listen(process.env.PORT, function() {
  console.log("VPIA running on http://localhost:" + process.env.PORT);
});
