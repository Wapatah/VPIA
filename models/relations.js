/* 
  This file maps the relationships between the data models - this gets loaded inside of the index.js.
  Please closely examine the naming structure. 

  FirstModel.relationship(SecondModel, {as: "name", foreignkey: "identifier"})

  HasMany relationship uses a foreign key that is used to refer to FirstModel.
  BelongsTo relationship uses a foreign key that is used to refer to the SecondModel.

  "name" is used when calling the associated database object in the API files (i.e. User.articles(), where articles() is equivalent to "as: 'articles'").

  If this is confusing, please look closely at the relationships below to see what we mean.

  Add relationships in this file.
*/

// eslint-disable-next-line no-unused-vars
module.exports.load = app => {
  let Archive = require("../HistoryService/models/archive");
  let Article = require("../WikiService/models/article");
  let User = require("../UserService/models/user");

  Archive.belongsTo(Article, { as: "articles", foreignKey: "article_id" });
  Archive.belongsTo(User, { as: "users", foreignKey: "user_id" });

  Article.belongsTo(User, { as: "users", foreignKey: "user_id" });
  Article.hasMany(Archive, { as: "archives", foreignKey: "article_id" });

  User.hasMany(Article, { as: "articles", foreignKey: "user_id" });
};
