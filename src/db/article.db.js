const {MANY_TO_MANY_ASSOCIATIONS_TABLES} = require('./constants.db');

module.exports = (connection, types) => {
    const article = connection.define('article',
    {
        title: {
            type: types.STRING(128)
        }
    },
    {freezeTableName: true});

    article.associate = (models) =>{
        //don't use destructuring here because we need to alter the references between the tables
        article.belongsTo(models.edition);

        article.hasMany(models.keyword);

        //N*M associations are defined from belongsToMany not from hasMany using through option
        article.belongsToMany(models.author, {through: MANY_TO_MANY_ASSOCIATIONS_TABLES.AUTHOR_ARTICLE});
    }

    return article;
};