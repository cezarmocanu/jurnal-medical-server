const {createField, TYPES} = require('./utils/createField');

const edition = ({title, collectionId} = {}) => ({
    title: createField(TYPES.STRING, title, "Edition Title"),
    collectionId: createField(TYPES.NUMBER, collectionId, "Edition CollectionId")
});

module.exports = edition;