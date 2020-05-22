/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all endpoints related to articles.
*/

// Importing the data models needed to manipulate
var Articles = require("../models/article.js");

var Archives = require("../../HistoryService/models/archive.js");
var Users = require("../../UserService/models/user.js");

module.exports = function(app) {
  // --------------------------------------------------------------------------------------------------------------------------------------------
  // POST /articles - create new Article
  app.post("/articles", function(req, res) {
    Articles.create({
      title: req.body.title,
      culture_group: req.body.culture_group,
      material: req.body.material,
      artwork_type: req.body.artwork_type,
      institution: req.body.institution,
      photo: req.body.photo,
      photo_license: req.body.photo_license,
      tags: req.body.tags,
      body: req.body.body,
      user_id: req.body.user_id,
      what_changed: "Original Museum Record"
    })
      .then(function(article) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: "B103",
          data: article
        });
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

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // GET /articles - GET ALL endpoint that responds with the list of all the articles
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

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // PUT /articles - endpoint for updating an article information.
  app.put("/articles", function(req, res) {
    Articles.find({ where: { id: req.body.id } })
      .then(function(article) {
        Articles.update(
          {
            id: req.body.id
          },
          {
            title: req.body.title,
            culture_group: req.body.culture_group,
            material: req.body.material,
            artwork_type: req.body.artwork_type,
            body: req.body.body,
            tags: req.body.tags,
            what_changed: req.body.what_changed,
            user_id: req.body.user_id
          }
        ).catch(function(error) {
          res.status(500).json({
            error: {
              error: true,
              message:
                "PUT: /articles (error updating article) " + error.message
            },
            code: "B108",
            data: {}
          });
        });
        Archives.create({
          title: article[0].title,
          culture_group: article[0].culture_group,
          material: article[0].material,
          artwork_type: article[0].artwork_type,
          institution: article[0].institution,
          photo: article[0].photo,
          body: article[0].body,
          tags: article[0].tags,
          what_changed: article[0].what_changed,
          user_id: article[0].user_id,
          article_id: article[0].id
        })
          .then(function(article) {
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
                message:
                  "PUT: /articles (error creating archives)" + error.message
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
            message: "PUT /articles: " + error.message
          },
          code: "B108",
          data: {}
        });
      });
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  Get /article/:id - GET ONE endpoint that responds with one article of the specific ID 
  (identified through the ID param)
*/
  app.get("/articles/:id/", function(req, res) {
    Articles.find({ where: { id: req.params.id } })
      .then(function(article) {
        Users.find({ where: { id: article[0].user_id } })
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
      })
      .catch(function(error) {
        res.status(500).json({
          error: {
            error: true,
            message: "GET /articles/:id/: " + error.message
          },
          code: "B114",
          data: {}
        });
      });
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  GET /articles/:id/history - Special GET endpoint that responds with list of previous versions of the
  article of the specific ID (identified through the ID param).
*/
  app.get("/articles/:id/history", function(req, res) {
    Archives.find({
      where: { article_id: req.params.id },
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
            message: "GET /articles/:id/history: " + error.message
          },
          code: "B116",
          data: {}
        });
      });
  });
};
