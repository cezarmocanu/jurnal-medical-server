module.exports = (connection, types) => {
    connection.define('edition',
    {
        title:{
            type: types.STRING(128),
        }
    },
    {freezeTableName: true});
};

