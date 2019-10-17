module.exports.load = (app) => {
  let Archive = require("../models/archive");
  let Article = require("../models/article");
  let Topic = require("../models/topic");
  let User = require("../models/user");

  Archive.belongsTo(Article, {as: "articles", foreignKey: "article_id" });
  Archive.belongsTo(User, {as: "users", foreignKey:"user_id"});
  
  Article.belongsTo(Topic, {as: "topics", foreignKey: "topic_id"});
  Article.belongsTo(User, {as: "users", foreignKey: "user_id"});
  Article.hasMany(Archive, {as: "archives", foreignKey: "article_id"});

  Topic.hasMany(Article, {as: "articles", foreignKey: "topic_id"});

  User.hasMany(Article, {as: "articles", foreignKey: "user_id"});
}