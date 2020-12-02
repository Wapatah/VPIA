const express = require("express");
const compression = require("compression"); // Adding middleman compression scheme for performance
const bodyParser = require("body-parser"); // body parser to parse the request body
const app = express();
let apiRoutes = express.Router();
let db = require("./config/db");
let cors = require("cors");
let jwt = require("jsonwebtoken");
require("dotenv").config();
let UserService = require("./config/config.json"); // Import the URL location for the microservice from config file

app.use(compression());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("superSecret", process.env.AUTH_SECRET); // Secret variable

// Limit the ability of non-users to access API routes.
module.exports = function isUserAuthenticated(req, res, next) {
  // Check header or url parameters or post parameters for token
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // Decode token
  if (token) {
    // Verifies secret and checks for expiration
    jwt.verify(token, app.get("superSecret"), (err, decoded) => {
      if (err) {
        res.status(500).json({
          error: {
            error: true,
            message: "Failed to authenticate token"
          },
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
        message: "No token provided"
      },
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

app.listen(UserService.PORT, () => {
  console.log(`User microservice listening at ${UserService.URL}`);
});
