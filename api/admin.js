/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all the endpoints which are accessible only to the admin.
  The endpoints are
  GET /users
  POST /users
  PUT  /users
  DELETE  /users
  NOTE:
  The above users endpoints are not present in this file as they are all the users
  endpoints this API has, they are present in a separate file, users.js
  All those still come under the ADMIN endpoints

  The rest of the endpoints:
  POST /topics
  PUT /topics
  DELETE /topics
  DELETE /articles
*/

// Importing the data models needed to manipulate
var Topics = require("../models/topic.js");
var Articles = require("../models/article.js");

module.exports = function(app) {
  // --------------------------------------------------------------------------------------------------------------------------------------------
  // DELETE /articles - remove article
  app.delete("/articles", function(req, res) {
    Articles.destroyById(req.body.id)
      .then(function() {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B109",
          data: {}
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "DELETE /articles: " + error.message
          },
          code: "B110",
          data: {}
        });
      });
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  POST /topics -  endpoint takes the topic name and topic description from the request body.
  It then creates a new record in the database.
*/
  app.post("/topics", function(req, res) {
    Topics.find({ where: { name: req.body.name } })
      .then(function(response) {
        if (response.length === 0) {
          Topics.create({
            name: req.body.name,
            description: req.body.description
          })
            .then(function(topic) {
              res.json({
                error: {
                  error: false,
                  message: ""
                },
                code: "B121",
                data: topic
              });
            })
            .catch(function(error) {
              res.status(500).json({
                error: {
                  error: true,
                  message: "POST /topics: failed to create " + error.message
                },
                code: "B122",
                data: {}
              });
            });
        } else {
          res.json({
            error: {
              error: true,
              message: "Topic exists!"
            },
            code: "",
            data: {}
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: {
            error: true,
            message:
              "POST /topics: failed to find existing topics " + error.message
          },
          code: "",
          data: {}
        });
      });
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  PUT /topics - endpoint for updating a topic information.
  Why does this Topic API remain? We are modifying it for 
  our filtering system. 
*/
  app.put("/topics", function(req, res) {
    Topics.update(
      {
        id: req.body.id
      },
      {
        name: req.body.name,
        description: req.body.description
      }
    )
      .then(function(topic) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B125",
          data: topic
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "PUT /topics: " + error.message
          },
          code: "B126",
          data: {}
        });
      });
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // DELETE /topics - remove topic
  app.delete("/topics", function(req, res) {
    if (req.body.id === 1) {
      res.status(403).json({
        error: {
          error: true,
          message: "Can not delete default topic!"
        },
        code: "",
        data: {}
      });
    } else {
      Topics.destroyById(req.body.id)
        .then(function() {
          Articles.find({ where: { topic_id: req.body.id } }).then(
            collection => {
              if (collection) {
                Articles.update(
                  {
                    where: {
                      topic_id: req.body.id
                    }
                  },
                  {
                    topic_id: 1
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
                          "DELETE /articles: Article update failed " +
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
            }
          );
        })
        .catch(function(error) {
          res.status(500).json({
            error: {
              error: true,
              message: "DELETE /topics: " + error.message
            },
            code: "B128",
            data: {}
          });
        });
    }
  });
};
