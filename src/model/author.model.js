const author = ({firstName, lastName} = {}) => ({
    firstName: firstName || 'Default firstName',
    lastName: lastName || 'Default lastName'
});

module.exports = author;