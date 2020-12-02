const {DataTypes} = require('sequelize');
const connection = require('./connection');

const createArticleModel = require('./article.db');
const createEditionModel = require('./edition.db');
const createAuthorModel = require('./author.db');

createArticleModel(connection, DataTypes);
createEditionModel(connection, DataTypes);
createAuthorModel(connection, DataTypes);


connection.models.edition.hasMany(connection.models.article);
connection.models.article.belongsTo(connection.models.edition,{
    foreignKey: "editionId"
});
connection.models.author.hasMany(connection.models.article);
connection.models.article.belongsTo(connection.models.author,{
    foreignKey: "authorId"
});

module.exports = {
    connection, 
    models: connection.models
};