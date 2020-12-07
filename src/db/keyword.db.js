const {MANY_TO_MANY_ASSOCIATIONS_TABLES} = require('./constants.db');

module.exports = (connection, types) => {
    const keyword = connection.define('keyword',
    {
        word:{
            type: types.STRING(64),
        }
    },
    {freezeTableName: true});

    keyword.associate = (models) => {
        //don't use destructuring here because we need to alter the references between the tables
        keyword.belongsToMany(models.article, {through: MANY_TO_MANY_ASSOCIATIONS_TABLES.ARTICLE_KEYWORD});
    }

    return keyword;
};

