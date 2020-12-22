const {Sequelize} = require('sequelize');
const {database, username, password, host} = require('../config.dev');


module.exports = new Sequelize(database, username, password, {
    host: host || 'localhost',
    dialect: 'postgres'
});