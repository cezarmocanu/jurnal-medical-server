const {DataTypes} = require('sequelize');
const connection = require('./connection');

const createArticleModel = require('./article.db');

createArticleModel(connection, DataTypes);


module.exports = {
    connection, 
    models: connection.models
};