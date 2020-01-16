/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all the endpoints related to topics. To be depreciated.
*/

// Importing the data models needed to manipulate
var Topics = require("../models/topic.js");
var Articles = require("../models/article");

module.exports = function(app) {
  // --------------------------------------------------------------------------------------------------------------------------------------------
  // GET /topics - This is a GET ALL endpoint that responds with the list of all the topics
  app.get("/topics", function(req, res) {
    Topics.all({ where: {} })
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
            message: "GET /topics: " + error.message
          },
          code: "B124",
          data: {}
        });
      });
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // GET /topics/:id - This is a GET ONE endpoint that responds with the topic which has the given ID
  app.get("/topics/:id", function(req, res) {
    Topics.find({ where: { id: req.params.id } })
      .then(function(topic) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B123",
          data: topic
        });
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "GET /topics/:id/: " + error.message
          },
          code: "B124",
          data: {}
        });
      });
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // GET /topic/:id/articles - Special GET endpoint that responds with the list of all the articles that belong to a particular topic (topic of given id param)
  app.get("/topic/:id/articles", function(req, res) {
    Articles.find({
      where: { topic_id: req.params.id },
      order: "updated_at DESC"
    })
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
            message: "GET /topics/:id/articles: " + error.message
          },
          code: "B130",
          data: {}
        });
      });
  });
};
