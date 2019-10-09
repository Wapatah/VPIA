var bookshelf = require("../config/db");
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
