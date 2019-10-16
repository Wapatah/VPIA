var bookshelf = require("../config/db");
bookshelf.plugin("registry");

var User = bookshelf.Model.extend({
  tableName: "users",
  articles: function() {
    return this.hasMany("Article");
  }
});

module.exports = bookshelf.model("User", User);
