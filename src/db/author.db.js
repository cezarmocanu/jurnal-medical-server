module.exports = (connection, types) => {
    connection.define('author',
    {
        firstName:{
            type: types.STRING(64),
        },
        
        lastName:{
            type: types.STRING(64),
        }
    },
    {freezeTableName: true});
};
