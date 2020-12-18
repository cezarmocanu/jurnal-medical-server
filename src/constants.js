/* OP stants for operations */
const OP_PATHS = {
    GET_ONE_BY_ID: '/one/:id',
    GET_ALL: '/all',
    CREATE_ONE: '/create/one',
    UPDATE: '/update/:id',
    DELETE: '/delete/:id'
};

const BREADCRUMB_PATHS = {
    COLLECTION: '/collection/:id',
    EDITION: '/edition/:id',
    ARTICLE: '/article/:id'
 };

const RES_STATUS = {
    OK:200,
    BAD_REQUEST:400,
    CONFLICT: 409,
    FORBIDDEN:403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR:500,
    UNAUTHORIZED: 401
};

module.exports = {
    OP_PATHS,
    BREADCRUMB_PATHS,
    RES_STATUS
}