const { DataTypes } = require('sequelize');
const connection = require('./connection');

const article = require('./article.db')(connection, DataTypes);
const edition = require('./edition.db')(connection, DataTypes);
const author = require('./author.db')(connection, DataTypes);
const keyword = require('./keyword.db')(connection, DataTypes);
const collection = require('./collection.db')(connection, DataTypes);
const user = require('./user.db')(connection, DataTypes);

const models = {
  article,
  edition,
  author,
  keyword,
  collection,
  user
};

Object.values(models).map((model) => {
  model.associate(models);
});

module.exports = {
  connection,
  models,
};
