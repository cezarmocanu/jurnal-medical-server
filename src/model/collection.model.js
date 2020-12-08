const {createField, TYPES} = require('./utils/createField');

const collection = ({ title } = {}) => ({
  title: createField(TYPES.STRING, title, "Default Collection Title")
});

module.exports = collection;
