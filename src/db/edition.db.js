module.exports = (connection, types) => {
    const edition = connection.define('edition',
    {
        title:{
            type: types.STRING(128),
        }
    },
    {freezeTableName: true});

    edition.associate = (models) => {
        //don't use destructuring here because we need to alter the references between the tables
        edition.hasMany(models.article);
    }

    return edition;
};

