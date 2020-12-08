const _ = require('lodash');

const TYPES = {
    NUMBER: (value) => !_.isNaN(value),
    STRING: (value) => _.isString(value)
}

//TODO Add fallback specific to type
//TODO Add a more specific error message
const createField = (type, value, fallback = null) => {
    if ( !type(value)) {
        console.warn("!createField: field type does not match the value");
        return fallback;
    }
    return value;
}

module.exports = {
    createField,
    TYPES
}