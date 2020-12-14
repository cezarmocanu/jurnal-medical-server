const {Sequelize} = require('sequelize');
const {database, username, password} = require('../config.dev');

module.exports = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres'
});
