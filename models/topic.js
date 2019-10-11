/* var bookshelf = require("../config/db");
bookshelf.plugin("registry");

var Topic = bookshelf.Model.extend({
  tableName: "topics",
  articles: function() {
    return this.hasMany("Article");
  }
});

module.exports = bookshelf.model("Topic", Topic);
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
