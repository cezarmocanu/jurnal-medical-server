const {Sequelize} = require('sequelize');
const {production, host ,database, username, password} = require('../config.dev');


const createConnection = () => {
    if (production) {
        return new Sequelize(database, username, password, {
            host,
            dialect: 'postgres',
            protocol: "postgres",   
            port: 5432
        });
    }

    return new Sequelize(database, username, password, {
        host: 'localhost',
        dialect: 'postgres'
    });
}
module.exports = createConnection();