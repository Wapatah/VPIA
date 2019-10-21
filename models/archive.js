/* 
@Mordax
The Archive schema - if data types need to be added or modified, it is done here.
Calls config for the database object.
Autoupdates instead of running migrations.
*/
var schema = require("../config/db");

var Archive = schema.define("archive", {
  title: { type: schema.String, limit: 255 }, 
  body: { type: schema.Text },
  updated_at: { type: schema.Date, default: Date.now },
  what_changed: { type: schema.String, limit: 255 },
});

schema.autoupdate();

module.exports = Archive;

