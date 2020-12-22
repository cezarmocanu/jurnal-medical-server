const {RES_STATUS} = require('../constants');
const {NOT_FOUND,CONFLICT,BAD_REQUEST,INTERNAL_SERVER_ERROR,OK,FORBIDDEN,UNAUTHORIZED} = RES_STATUS;

const response = (res) => ({
    badRequest: (data={}) => res.status(BAD_REQUEST).json({data}),
    conflict: (data = {}) => res.status(CONFLICT).json({data}),
    ok: (data={}) => res.status(OK).json({data}),
    forbidden:(data={}) => res.status(FORBIDDEN).json({data}),
    notFound: (data = {}) => res.status(NOT_FOUND).json({data}),
    internalServerError: ({error = {},data = {}} = {}) => res.status(INTERNAL_SERVER_ERROR).json({data,error:JSON.stringify(error)}),
    unauthorized: (data={}) => res.status(UNAUTHORIZED).json({data})
});

module.exports = {
    response
}