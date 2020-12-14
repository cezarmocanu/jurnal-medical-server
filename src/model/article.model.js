const {createField, TYPES} = require('./utils/createField');

const article = ({title, authors, keywords, editionId} = {}) => ({
    title: createField(TYPES.STRING, title, "Default Title"),
    editionId: createField(TYPES.NUMBER, editionId, "Default EditionId")
});

module.exports = article;