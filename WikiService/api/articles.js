#!/usr/bin/env node
/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all endpoints related to articles.
*/

// Importing the data models needed to manipulate
var Articles = require("../models/article.js");
var Users = require("../../UserService/models/user.js");
var Archives = require("../../HistoryService/models/archive.js");
const isAdminAuthenticated = require("../../index.js");
const isUserAuthenticated = require("../../index.js");

module.exports = app => {
  // --------------------------------------------------------------------------------------------------------------------------------------------
  // POST /articles - create new Article
  app.post("/articles", isAdminAuthenticated, async (req, res) => {
    try {
      const article = await Articles.create({
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
      });
      res.json({
        error: {
          error: false
        },
        data: article
      });
    } catch (err) {
      res.status(500).json({
        error: {
          message: "POST: /articles/ " + error.message
        }
      });
    }
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // GET /articles - GET ALL endpoint that responds with the list of all the articles
  app.get("/articles", async (req, res) => {
    try {
      const article = await Articles.all({
        where: {},
        order: "updated_at DESC"
      });
      res.json({
        error: {
          error: false
        },
        data: article
      });
    } catch (err) {
      res.status(500).json({
        error: {
          message: "GET: /articles/ " + err.message
        },
        data: {}
      });
    }
  });

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // PUT /articles - endpoint for updating an article information.
  app.put("/articles", isUserAuthenticated, async (req, res) => {
    try {
      const article = Articles.update(
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
      );
      res.json({
        error: {
          error: false
        },
        data: article
      });
    } catch (err) {
      res.status(500).json({
        error: {
          message: "PUT: /articles (error updating article) " + err.message
        },
        data: {}
      });
    }
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  Get /article/:id - GET ONE endpoint that responds with one article of the specific ID 
  (identified through the ID param)
*/
  app.get("/articles/:id/", async (req, res) => {
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

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // DELETE /articles - remove article
  app.delete("/articles", isAdminAuthenticated, async (req, res) => {
    try {
      const article = await Articles.destroyById(req.body.id);
      res.json({
        error: {
          error: false
        },
        data: {}
      });
    } catch (err) {
      res.status(500).json({
        error: {
          message: "DELETE /articles: " + err.message
        },
        data: {}
      });
    }
  });
};
