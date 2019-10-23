/*
@Matterwiki
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
POST /logo
POST /topics
PUT /topics
DELETE /topics
DELETE /articles

@Mordax
Multer is a node.js middleware for handling multipart/form-data, 
which is primarily used for uploading files.
*/
// @Matterwiki - Importing the models
var Topics = require("../models/topic.js");
var Articles = require("../models/article.js");

module.exports = function(app) {
  /*
  @Matterwiki
  This endpoint takes the topic name and topic description from the request body.
  It then saves those values in the database using the insert query.
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
                  message:  "POST /topics: failed to create " + error.message
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
            message:  "POST /topics: failed to find existing topics " + error.message
          },
          code: "",
          data: {}
        });
      });
  });

  /*
  @Matterwiki
  This is a PUT endpoint for updating a topic information.
  It takes the id of the topic to be updated and then updates it with the new object.
  the error key in the returning object is a boolen which is false if there is no 
  error and true otherwise

  TODO: Add updates only for columns that are in the request body. Handle exceptions.
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

  /*
  @Matterwiki
  This is a DELETE endpoint for delete a complete topic from the database.
  It takes the id of the topic and then delete that record from the database.
  the error key in the returning object is a boolen which is false if there 
  is no error and true otherwise
  */
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
                        message:  "DELETE /articles: Article update failed " + error.message
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
              message:  "DELETE /topics: " + error.message
            },
            code: "B128",
            data: {}
          });
        });
    }
  });

  /*
  @Matterwiki
  This is a DELETE endpoint for delete a complete article from the database.
  It takes the id of the article and then deletes that record from the database.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
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
};
