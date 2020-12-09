const {createField, TYPES} = require('./utils/createField');

const user = ({email,password} = {}) => ({
    email: createField(TYPES.STRING, email, "Default E-Mail"),
    password: createField(TYPES.STRING, password, "Default Password")
});

module.exports = user;