const express = require("express");
const compression = require("compression"); // Adding middleman compression scheme for performance
const bodyParser = require("body-parser"); // body parser to parse the request body
const app = express();
let apiRoutes = express.Router();
let db = require("./config/db");
let cors = require("cors");
let jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const https = require("https");
const fs = require("fs");

const httpsOptions = {
  cert: fs.readFileSync("/etc/letsencrypt/live/vpia.wapatah.com/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/vpia.wapatah.com/privkey.pem")
};

app.use(compression());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("superSecret", process.env.AUTH_SECRET); // Secret variable

/// Limit the ability of non-users to access API routes.
exports.isUserAuthenticated = function(req, res, next) {
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
            message: "Failed to authenticate User token"
          },
          code: "USERNOTAUTH",
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
    res.status(403).json({
      error: {
        error: true,
        message: "No User token provided"
      },
      code: "NOUSERTOKEN",
      data: {}
    });
  }
};

// Limit the ability of non-admin users to access API routes.
exports.isAdminAuthenticated = function(req, res, next) {
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
            message: "Failed to authenticate Admin token"
          },
          code: "ADMINNOTAUTH",
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
              message: "Only Admins are authorized to perform this action"
            },
            code: "NOTADMIN",
            data: {}
          });
        }
      }
    });
  } else {
    // If there is no token, return an error
    res.status(403).json({
      error: {
        error: true,
        message: "No Admin token provided"
      },
      code: "NOADMINTOKEN",
      data: {}
    });
  }
};

// Importing all endpoints for user

require("./api/authentication")(app);
require("./api/setup")(apiRoutes);
require("./api/users")(apiRoutes);

app.use("/api", apiRoutes);

app.use(express.static(__dirname + "/client"));

https.createServer(httpsOptions, app).listen(process.env.USERPORT, () => {
  console.log(`User microservice listening at ${process.env.USERSERVICE}`);
});
