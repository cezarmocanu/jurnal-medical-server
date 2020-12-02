const {DataTypes} = require('sequelize');
const connection = require('./connection');

const createArticleModel = require('./article.db');
const createEditionModel = require('./edition.db');

createArticleModel(connection, DataTypes);
createEditionModel(connection, DataTypes);


connection.models.edition.hasMany(connection.models.article);
connection.models.article.belongsTo(connection.models.edition,{
    foreignKey: "editionId"
});

module.exports = {
    connection, 
    models: connection.models
};