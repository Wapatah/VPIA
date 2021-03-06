/* 
  The Archive schema - if data types need to be added or modified, it is done here.
  Autoupdates instead of running migrations.
*/

// Imports config/db.js for the database object.
let schema = require("../config/db");

let Archive = schema.define("archive", {
  title: { type: schema.String, limit: 255 },
  photo: { type: schema.String },
  culture_group: { type: schema.String },
  institution: { type: schema.String, limit: 255 },
  material: { type: schema.String },
  artwork_type: { type: schema.String, limit: 255 },
  tags: { type: schema.String },
  body: { type: schema.Text },
  updated_at: { type: schema.Date, default: Date.now },
  what_changed: { type: schema.String, limit: 255 },
  article_id: { type: schema.String, limit: 255 },
  user_id: { type: schema.String, limit: 255 }
});

schema.autoupdate();

module.exports = Archive;
