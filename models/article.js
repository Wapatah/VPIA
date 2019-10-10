/* var bookshelf = require("../config/db");
bookshelf.plugin("registry");

var Article = bookshelf.Model.extend({
  tableName: "articles",
  topic: function() {
    return this.belongsTo("Topic", "topic_id");
  },
  user: function() {
    return this.belongsTo("User", "user_id");
  },
  archives: function() {
    return this.hasMany("Archives");
  }
});

module.exports = bookshelf.model("Article", Article);
 */
var schema = require("../config/db");

var Article = schema.define("article", {
  title: { type: schema.String, limit: 255 },
  body: { type: schema.Text },
  created_at: { type: schema.Date },
  updated_at: { type: schema.Date },
  what_changed: { type: schema.String, limit: 255 },
  user_id: { type: schema.Integer },
  topic_id: { type: schema.String }
});

schema.automigrate();

module.exports = Article;