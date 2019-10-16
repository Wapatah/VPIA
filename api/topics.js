/*
@Matterwiki
This file contains all the endpoints related to topics.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/

// @Matterwiki - Importing the topics model
var Topics = require("../models/topic.js");
var Articles = require("../models/article");

module.exports = function(app) {
  /*
  @Matterwiki
  This is a GET endpoint that responds with the list of all the topics in the topics table
  the topics are present in the data object in the returning object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.get("/topics", function(req, res) {
    Topics.all({where: {}})
      .then(function(collection) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B123",
          data: collection
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: "B124",
          data: {}
        });
      });
  });

  /*
  @Matterwiki
  This is a GET endpoint that responds with the topic which has the given ID
  the topic is present in the data object in the returning object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.get("/topics/:id", function(req, res) {
    Topics.forge({ id: req.params.id })
      .fetch()
      .then(function(topic) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B123",
          data: topic.toJSON()
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: "B124",
          data: {}
        });
      });
  });

  /*
  @Matterwiki
  This is a GET endpoint that responds with the list of all the articles that belong to a particular topic (topic of given id param)
  the articles are present in the data object in the returning object.
  the error key in the returning object is a boolen which is false if there is no error and true otherwise
  */
  app.get("/topic/:id/articles", function(req, res) {
    Articles.find({ where: {topic_id: req.params.id} })
      .then(function(article) {
        res.status(200).json({
          error: {
            error: false,
            message: ""
          },
          code: "B129",
          data: article
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: "B130",
          data: {}
        });
      });
  });
};
