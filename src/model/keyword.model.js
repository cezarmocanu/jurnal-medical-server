const {createField, TYPES} = require('./utils/createField');

const keyword = ({word} = {}) => ({
    word: createField(TYPES.STRING, word, "Default Word")
});

module.exports = keyword;