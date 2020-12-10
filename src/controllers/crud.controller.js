const {GET_ALL,GET_ONE_BY_ID, CREATE_ONE, UPDATE, DELETE} = require('../constants').OP_PATHS;
const _ = require('lodash');
const { model } = require('../db/connection');

//TODO Add datamodel as a parameter tocheck if posted data is corect
const withCrud = (router, repo, dataModel) => {
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
        
        try {
            const {id} = _.get(req, 'params', null);
           
            if (_.isNaN(id)){
                return res.json({data: {}})
            }

            const entity = await repo.findByPk(id);   

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
        
        //typecheck
        const newEntity = dataModel(body);
        
        try {

            await repo.create(newEntity);

            return res.json({data: newEntity});    

        } catch (error) {
            return res.json({data:[error]});
        }
    })

    router.put(UPDATE, async (req,res) =>{

        const params = _.get(req, 'params', null);
        const body = _.get(req, 'body', null);

        if (_.isNil(params) || _.isEmpty(params)){
            return res.json({data: {}})
        }

        if (_.isNil(body) || _.isEmpty(body)){
            return res.json({data: {}})
        }

        const {id} = params;

        if (_.isNaN(id)){
            return res.json({data: {}})
        }

        try {
            const entity= await repo.findByPk(id);

            if (_.isNil(entity)) {
                return res.json({data: {}})
            }

            const newEntity = await repo.update({...body}, {where:{id}});

            return res.json({data: newEntity});

        } catch (error) {
            return res.json({data:[error]});
        }

    });

    router.delete(DELETE, async (req,res) =>{

        const params = _.get(req, 'params', null);

        if (_.isNil(params) || _.isEmpty(params)){
            return res.json({data: {}})
        }

        const {id} = params;

        if (_.isNaN(id)){
            return res.json({data: {}})
        }

        try {
            const entity= await repo.findByPk(id);

            if (_.isNil(entity)) {
                return res.json({data: {}})
            }

            const deletedEntity = await repo.destroy({where:{id}});

            return res.json({data: deletedEntity});

        } catch (error) {
            return res.json({data:[error]});
        }

    });

    return router;
};

module.exports = {
    withCrud
}