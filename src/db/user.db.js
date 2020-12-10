module.exports = (connection, types) => {
    const user = connection.define('user',
    {
        email:{
            type: types.STRING(128),
        },

        password:{
            type: types.STRING(128),
        }
    },
    {freezeTableName: true});

    user.associate = (models) => {
        //don't use destructuring here because we need to alter the references between the tables
    }

    return user;
};

