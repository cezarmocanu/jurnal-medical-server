const {DataTypes} = require('sequelize');
const connection = require('./connection');

const article = require('./article.db')(connection,DataTypes);
const edition = require('./edition.db')(connection,DataTypes);
const author = require('./author.db')(connection,DataTypes);

const models = {
    article,
    edition,
    author
};

Object.values(models).map(model => {
    model.associate(models);
});


module.exports = {
    connection, 
    models
};