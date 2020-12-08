const {createField, TYPES} = require('./utils/createField');

const article = ({title, authors, keywords} = {}) => ({
    title: createField(TYPES.STRING, title, "Default Title")
});

module.exports = article;