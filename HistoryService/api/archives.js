/* --------------------------------------------------------------------------------------------------------------------------------------------
  This file contains all endpoints related to archives.
  POST and DELETE are handled when an Article is created/destroyed, since
  the archive tracks updates to Articles. 
  Archives cannot be updated with PUT.
*/
// Importing the data models needed to manipulate
const Archives = require("../models/archive.js");
const isUserAuthenticated = require("../index.js");
const isAdminAuthenticated = require("../index.js");

module.exports = app => {
  /* --------------------------------------------------------------------------------------------------------------------------------------------
  GET /archive/:id - endpoint that responds with one archive of the 
  specific ID (identified through the ID param)
*/

  app.post("/archives", isUserAuthenticated, async (req, res) => {
    try {
      const archive = await Archives.create({
        title: req.body.title,
        culture_group: req.body.culture_group,
        material: req.body.material,
        artwork_type: req.body.artwork_type,
        institution: req.body.institution,
        photo: req.body.photo,
        body: req.body.body,
        tags: req.body.tags,
        user_id: req.body.user_id,
        article_id: req.body.article_id,
        what_changed: req.body.what_changed
      });
      res.json({
        error: {
          error: false
        },
        data: archive
      });
    } catch (err) {
      res.status(500).json({
        error: {
          error: true,
          message: "POST: /archives" + err.message
        },
        data: {}
      });
    }
  });

  app.get("/archives", async (req, res) => {
    try {
      const archive = await Archives.all({
        where: {},
        order: "updated_at DESC"
      });
      res.json({
        error: {
          error: false
        },
        data: archive
      });
    } catch (err) {
      res.status(500).json({
        error: {
          message: "GET: /archives/ " + err.message
        },
        data: {}
      });
    }
  });

  app.get("/archives/:id/", async (req, res) => {
    try {
      const archive = await Archives.find({
        where: { id: req.params.id }
      });
      res.json({
        error: {
          error: false
        },
        data: archive
      });
    } catch (err) {
      res.status(500).json({
        error: {
          message: "GET: /archives/:id/: " + err.message
        },
        data: {}
      });
    }
  });

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  GET /articles/:id/history - Special GET endpoint that responds with list of previous versions of the
  article of the specific ID (identified through the ID param).
*/
  app.get("/articles/:id/history", async (req, res) => {
    try {
      const archive = await Archives.find({
        where: { article_id: req.params.id },
        order: "updated_at DESC"
      });
      res.json({
        error: {
          error: false
        },
        data: archive
      });
    } catch (err) {
      res.status(500).json({
        error: {
          message: "GET /articles/:id/history: " + err.message
        },
        data: {}
      });
    }
  });

  /* -------------------------------------------------------------
    DELETE /archives/:article_id - Delete endpoint, this takes the article id and deletes all archive items
    related to it.
  */
  app.delete(
    "/articles/:id/history",
    isAdminAuthenticated,
    async (req, res) => {
      try {
        // Remove collection is finicky - you need an error callback for it to work, no other way.
        const archive = Archives.remove(
          {
            where: { article_id: req.params.id }
          },
          err => {
            if (err) {
              res.status(500).json({
                error: {
                  message: "DELETE /articles/:id/history: " + err
                },
                data: {}
              });
            }
          }
        );
        res.status(200).json({
          error: {
            error: false
          },
          data: {}
        });
      } catch (err) {
        res.status(500).json({
          error: {
            message: "DELETE /articles/:id/history: " + err.message
          },
          data: {}
        });
      }
    }
  );
};
