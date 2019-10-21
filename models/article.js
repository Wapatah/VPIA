/* 
@Mordax
The Article schema - if data types need to be added or modified, it is done here.
Calls config for the database object.
Autoupdates instead of running migrations.
*/
var schema = require("../config/db");

var Article = schema.define("article", {
  title: { type: schema.String, limit: 255 },
  body: { type: schema.Text },
  created_at: { type: schema.Date, default: Date.now },
  updated_at: { type: schema.Date, default: Date.now },
  what_changed: { type: schema.String, limit: 255 }
});

schema.autoupdate();

module.exports = Article;
