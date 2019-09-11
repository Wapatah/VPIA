var bookshelf = require("../config/bookshelf");
bookshelf.plugin("registry");

var Archives = bookshelf.Model.extend({
    tableName: "archives",
    articles: function() {
        return this.belongsTo("Articles", "article_id");
    }
});

module.exports = bookshelf.model("Archives", Archives);
