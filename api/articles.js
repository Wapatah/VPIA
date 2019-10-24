/*
@Matterwiki
This file contains all endpoints related to articles.
The endpoint to display articles related to a particular topic (/topics/:id/articles)
is not in this file because that is a topics endpoint.
To avoid any confusion, here is how you filter which file should an endpoint belong to.
Check the first word in the url. If topics comes first (as it does in the above example)
then move it to the topics endpoints file.
*/

// @Matterwiki - Importing the models
var Articles = require("../models/article.js");
var Topics = require("../models/topic.js");
var Archives = require("../models/archive.js");
var Users = require("../models/user.js");
var ObjectId = require("mongodb").ObjectId;

module.exports = function(app) {
  /*
  @Matterwiki
  This endpoint takes the article title, article body, and topic id from the request body.
  It then saves those values in the database using the insert query.
  After the operation is complete the endpoint returns the success object.
  TODO: create formal guidelines for different object structures and follow that throughout the API.
  */
  app.post("/articles", function(req, res) {
    Articles.create({
      title: req.body.title,
      body: req.body.body,
      topic_id: req.body.topic_id,
      user_id: req.body.user_id,
      what_changed: "Another drop in the ocean of knowledge"
    })
      .then(function(article) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B103",
          data: article
        }); // @Matterwiki - responds back to request
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "POST: /articles/ " + error.message
          },
          code: "B104",
          data: {}
        });
      });
  });

  /*
  @Matterwiki
  This is a GET endpoint that responds with the list of all the articles in the articles table
  the articles are present in the data object in the returning object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.get("/articles", function(req, res) {
    Articles.all({
      where: {},
      order: "updated_at DESC"
    })
      .then(function(collection) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B105",
          data: collection
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "GET: /articles/ " + error.message
          },
          code: "B106",
          data: {}
        });
      });
  });

  /*
  This is a PUT endpoint for updating an article information.
  It takes the id of the topic to be updated and then updates it with the new object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise

  TODO: Add updates only for columns that are in the request body. Handle exceptions.
  */
  app.put("/articles", function(req, res) {
    var id = new ObjectId(req.body.id);
    Articles.find({ where: { "_id": id } })
      .then(function(article) {
        Articles.update(
          {
            "_id": id
          },
          {
            title: req.body.title,
            body: req.body.body,
            topic_id: req.body.topic_id,
            what_changed: req.body.what_changed,
            user_id: req.body.user_id
          }
        )
        .catch(function(error) {
          res.status(500).json({
            error: {
              error: true,
              message: "WTF" + error.message
            },
            code: "B108",
            data: {}
          });
        });
        Archives.create({
          title: article[0].title,
          body: article[0].body,
          what_changed: article[0].what_changed,
          user_id: article[0].user_id,
          article_id: article[0].id,
        }).then(function(article) {
          res.json({
            error: {
              error: false,
              message: ""
            },
            code: "B107",
            data: article
          });
        })
        .catch(function(error) {
          res.status(500).json({
            error: {
              error: true,
              message: "FUCK " + error.message
            },
            code: "B108",
            data: {}
          });
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "PUT: /articles/ ertrerte" + error.message
          },
          code: "B108",
          data: {}
        });
      });
  });

  /*
  @Matterwiki
  This is a GET endpoint that responds with one article of the specific ID (identified through the ID param)
  the article is present in the data object in the returning object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.get("/articles/:id/", function(req, res) {
    var id = new ObjectId(req.params.id);
    Articles.find({ where: { "_id": id } })
      .then(function(article) {
        var topic_id = new ObjectId(article[0].topic_id);
        Topics.find({ where: { "_id": topic_id } })
          .then(function(topic) {
            article[0].topics(topic);
          })
          .then(function() {
            var user_id = new ObjectId(article[0].user_id);
            Users.find({ where: { "_id": user_id } })
              .then(function(user) {
                article[0].users(user);
              })
              .then(function() {
                res.json({
                  error: {
                    error: false,
                    message: ""
                  },
                  code: "B113",
                  data: article
                });
              });
          });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "/articles/:id/ " + error.message
          },
          code: "B114",
          data: {}
        });
      });
  });

  /*
  @Matterwiki
  This is a GET endpoint that responds with previous versions of the
  article of the specific ID (identified through the ID param).
  The article is present in the data object in the returning object.
  The error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.get("/articles/:id/history", function(req, res) {
    var id = new ObjectId(req.params.id)
    Archives.find({
      where: { article_id: id },
      order: "updated_at DESC"
    })
      .then(function(archive) {
        res.status(200).json({
          error: {
            error: false,
            message: ""
          },
          code: "B115",
          data: archive
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "/articles/:id/history" + error.message
          },
          code: "B116",
          data: {}
        });
      });
  });
};
