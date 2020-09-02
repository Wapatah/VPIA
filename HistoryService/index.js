const express = require("express");
const compression = require("compression"); // Adding middleman compression scheme for performance
const bodyParser = require("body-parser"); // body parser to parse the request body
const app = express();
let apiRoutes = express.Router();
let config = require("./config/config"); // JWT key - DO NOT PUBLICIZE THIS IF USING IN PRODUCTION.
let db = require("./config/db");
let cors = require("cors");
let jwt = require("jsonwebtoken");

app.use(compression());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("superSecret", config.auth_secret); // Secret variable

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

const PORT = 31000;

// Importing all endpoints for archives
require("./api/archives")(apiRoutes);
app.use("/api", apiRoutes);

app.use(express.static(__dirname + "/client"));

app.listen(PORT, () => {
  console.log("Listening at http://localhost:" + PORT);
});
