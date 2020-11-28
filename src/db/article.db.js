module.exports = (connection, types) => {
    connection.define('article',
    {
        title: {
            type: types.STRING(128)
        }
    },
    {freezeTableName: true});
};