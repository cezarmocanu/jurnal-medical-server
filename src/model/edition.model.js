const {createField, TYPES} = require('./utils/createField');

const edition = ({title} = {}) => ({
    title: createField(TYPES.STRING, title, "Edition Title")
});

module.exports = edition;