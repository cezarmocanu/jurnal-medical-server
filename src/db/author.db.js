const {MANY_TO_MANY_ASSOCIATIONS_TABLES} = require('./constants.db');

module.exports = (connection, types) => {
    const author = connection.define('author',
    {
        firstName:{
            type: types.STRING(64),
        },
        
        lastName:{
            type: types.STRING(64),
        }
    },
    {freezeTableName: true});

    author.associate = (models) =>{
        //don't use destructuring here because we need to alter the references between the tables
        author.hasMany(models.article);
    }

    return author;
};
