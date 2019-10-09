var bookshelf = require("../config/db");
bookshelf.plugin("registry");

var Topic = bookshelf.Model.extend({
  tableName: "topics",
  articles: function() {
    return this.hasMany("Article");
  }
});

module.exports = bookshelf.model("Topic", Topic);
