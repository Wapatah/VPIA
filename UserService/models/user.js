/* 
The User schema - if data types need to be added or modified, it is done here.
Autoupdates instead of running migrations.
*/

// Imports config/db.js for the database object.
let schema = require("../config/db");

let User = schema.define("user", {
  admin: { type: schema.Boolean },
  name: { type: schema.String, limit: 255 },
  email: { type: schema.String, limit: 255 },
  password: { type: schema.String, limit: 255 },
  about: { type: schema.String, limit: 255 },
  headline: { type: schema.String, limit: 255 },
  group: { type: schema.String, limit: 255 },
  education: { type: schema.String, limit: 255 },
  land: { type: schema.String, limit: 255 },
  position: { type: schema.String, limit: 255 },
  organization: { type: schema.String, limit: 255 },
  created_at: { type: schema.Date, default: Date.now },
  updated_at: { type: schema.Date, default: Date.now }
});

schema.autoupdate();

module.exports = User;
