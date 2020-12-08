const {createField, TYPES} = require('./utils/createField');

const author = ({firstName, lastName} = {}) => ({
    firstName: createField(TYPES.STRING, firstName, "Firstname"),
    lastName: createField(TYPES.STRING, lastName, "Lastname")
});

module.exports = author;