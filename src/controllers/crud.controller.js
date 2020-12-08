const {GET_ALL,GET_ONE_BY_ID, CREATE_ONE} = require('../constants').OP_PATHS;
const _ = require('lodash');

//TODO Add datamodel as a parameter tocheck if posted data is corect
const withCrud = (router, repo) => {
    //TODO: Add send status 
    //TODO: Add error message to response body
    router.get(GET_ALL, async (req,res) => {
        const entities = await repo.findAll();

        if (!_.isArray(entities) || _.isEmpty(entities)) {
            return res.json({data: []})
        }

        return res.json({data:entities});
    });

    //TODO: Add send status 
    //TODO: Add error message to response body
    router.get(GET_ONE_BY_ID, async (req,res) => {

        const body = _.get(req, 'body', null);

        if (_.isNil(body) || _.isEmpty(body)){
            return res.json({data: {}})
        }

        const {id} = body;

        if (_.isNaN(id)){
            return res.json({data: {}})
        }
        //TODO surround with try catch and add an error response
        const entity = await repo.findBtPk(id);

        if (_.isNil(entity)) {
            return res.json({data: {}})
        }

        return res.json(entity);
    });

    router.post(CREATE_ONE, async (req,res) => {
        const body = _.get(req, 'body', null);

        if (_.isNil(body) || _.isEmpty(body)){
            return res.json({data: {}})
        }

        //TODO typecheck based on datamodel
        const newEntity = { ...body };

        await repo.create(newEntity);

        //TODO surround with try catch and add an error response
        return res.json({data: newEntity})
    })

    return router;
};

module.exports = {
    withCrud
}