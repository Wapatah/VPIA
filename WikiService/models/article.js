/* 
  The Article schema - if data types need to be added or modified, it is done here.
  Autoupdates instead of running migrations.
*/

// Imports config/db.js for the database object.
var schema = require("../../config/db");

var Article = schema.define("article", {
  title: { type: schema.String, limit: 255 },
  photo: { type: schema.Text },
  culture_group: { type: schema.String },
  institution: { type: schema.String, limit: 255 },
  material: { type: schema.String },
  artwork_type: { type: schema.String, limit: 255 },
  photo_license: { type: schema.Text },
  tags: { type: schema.String },
  body: { type: schema.Text },
  created_at: { type: schema.Date, default: Date.now },
  updated_at: { type: schema.Date, default: Date.now },
  what_changed: { type: schema.String, limit: 255 }
});

schema.autoupdate();

module.exports = Article;
