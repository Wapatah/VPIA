/* 
@Mordax
The Topic schema - if data types need to be added or modified, it is done here.
Calls config for the database object.
Autoupdates instead of running migrations.
*/
var schema = require("../config/db");

var Topic = schema.define("topic", {
  name: { type: schema.String, limit: 255 },
  description: { type: schema.String, limit: 255 },
  created_at: { type: schema.Date },
  updated_at: { type: schema.Date }
});

schema.autoupdate();

module.exports = Topic;
