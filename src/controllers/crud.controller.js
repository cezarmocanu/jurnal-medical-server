const {GET_ALL,GET_ONE_BY_ID, CREATE_ONE} = require('../constants').OP_PATHS;
const _ = require('lodash');

//TODO Add datamodel as a parameter tocheck if posted data is corect
const withCrud = (router, repo) => {
    //TODO: Add send status 
    //TODO: Add error message to response body
    router.get(GET_ALL, async (req,res) => {
        try {
    
            const entities = await repo.findAll();
            
            if (!_.isArray(entities) || _.isEmpty(entities)) {
                return res.json({data: []})
            }
            
            return res.json({data:entities});
        
        } catch (error) {
           return res.json({data: [error]});
        }
    });

    //TODO: Add send status 
    //TODO: Add error message to response body
    router.get(GET_ONE_BY_ID, async (req,res) => {

<<<<<<< HEAD
=======
>>>>>>> 37a091ccc6bce0a1c1bd9507056361e709282e5f
        const body = _.get(req, 'body', null);

        if (_.isNil(body) || _.isEmpty(body)){
            return res.json({data: {}})
        }

        const {id} = body;

        if (_.isNaN(id)){
            return res.json({data: {}})
        }
        try {
            
            const entity = await repo.findBtPk(id);   
            
            if (_.isNil(entity)) {
                return res.json({data: {}})
            }

            return res.json(entity);
        
        } catch (error) {
            return res.json({data:[error]});
        }
    });

    router.post(CREATE_ONE, async (req,res) => {
        const body = _.get(req, 'body', null);

        if (_.isNil(body) || _.isEmpty(body)){
            return res.json({data: {}})
        }

        //TODO typecheck based on datamodel
        const newEntity = { ...body };
        try {

            await repo.create(newEntity);

            return res.json({data: newEntity});    

        } catch (error) {
            return res.json({data:[error]});
        }
    })

    return router;
};

module.exports = {
    withCrud
}