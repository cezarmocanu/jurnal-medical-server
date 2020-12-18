const {Sequelize} = require('sequelize');
const {database, username, password} = require('../config.dev');


const createConnection = () => {
    if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
        new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
            dialect: 'postgres',
            protocol: "postgres",   
            port: 5432,
            logging: true
        });
    }

    return new Sequelize(database, username, password, {
        host: 'localhost',
        dialect: 'postgres'
    });
}
module.exports = createConnection();