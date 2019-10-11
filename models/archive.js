/* var bookshelf = require("../config/db");
bookshelf.plugin("registry");

var Archives = bookshelf.Model.extend({
  tableName: "archives",
  articles: function() {
    return this.belongsTo("Articles", "article_id");
  }
});

module.exports = bookshelf.model("Archives", Archives); */
var schema = require("../config/db");

var Archive = schema.define("archive", {
  title: { type: schema.String, limit: 255 }, 
  body: { type: schema.Text },
  updated_at: { type: schema.Date },
  what_changed: { type: schema.String, limit: 255 },
});

schema.autoupdate();

module.exports = Archive;

