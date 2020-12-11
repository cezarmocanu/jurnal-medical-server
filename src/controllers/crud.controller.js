const {OP_PATHS} = require('../constants');
const {GET_ALL,GET_ONE_BY_ID, CREATE_ONE, UPDATE, DELETE} = OP_PATHS;
const {response} = require('./utils.controller');
const _ = require('lodash');

//TODO Add datamodel as a parameter tocheck if posted data is corect
const withCrud = (router, repo, dataModel) => {
    //TODO: Add error message to response body
    router.get(GET_ALL, async (req,res) => {
        try {
    
            const entities = await repo.findAll();
            
            if (!_.isArray(entities) || _.isEmpty(entities)) {
                return response(res).notFound([]);
            }
            
            return response(res).ok(entities);
        
        } catch (error) {
            return response(res).internalServerError({error})
        }
    });

    //TODO: Add send status 
    //TODO: Add error message to response body
    router.get(GET_ONE_BY_ID, async (req,res) => {
        
        try {
            const {id} = _.get(req, 'params', null);
           
            if (_.isNaN(id)){
                return response(res).badRequest();
            }

            const entity = await repo.findByPk(id);   

            if (_.isNil(entity)) {
                return response(res).notFound();
            }

            return response(res).ok(entity);
        
        } catch (error) {
            return response(res).internalServerError({error})
        }
    });

    router.post(CREATE_ONE, async (req,res) => {
        const body = _.get(req, 'body', null);

        if (_.isNil(body) || _.isEmpty(body)){
            return response(res).badRequest();
        }

        const newEntity = dataModel(body);

        try {
            await repo.create(newEntity);

            return response(res).ok(newEntity);

        } catch (error) {
            return response(res).internalServerError({error})
        }
    })

    router.put(UPDATE, async (req,res) =>{

        const params = _.get(req, 'params', null);
        const body = _.get(req, 'body', null);

        if (_.isNil(params) || _.isEmpty(params)){
            return response(res).badRequest();
        }

        if (_.isNil(body) || _.isEmpty(body)){
            return response(res).badRequest();
        }

        const {id} = params;

        if (_.isNaN(id)){
            return response(res).badRequest();
        }

        const newEntityChecker = dataModel(body);

        try {
            const entity= await repo.findByPk(id);

            if (_.isNil(entity)) {
                return response(res).notFound();
            }

            const newEntity = await repo.update(newEntityChecker, {where:{id}});

            return response(res).ok(newEntity);

        } catch (error) {
            return response(res).internalServerError({error})
        }

    });

    router.delete(DELETE, async (req,res) =>{

        const params = _.get(req, 'params', null);

        if (_.isNil(params) || _.isEmpty(params)){
            return response(res).badRequest();
        }

        const {id} = params;

        if (_.isNaN(id)){
            return response(res).badRequest();
        }

        try {
            const entity= await repo.findByPk(id);

            if (_.isNil(entity)) {
                return response(res).notFound();
            }

            const deletedEntity = await repo.destroy({where:{id}});

            return response(res).ok(deletedEntity);

        } catch (error) {
            return response(res).internalServerError({error})
        }

    });

    return router;
};

module.exports = {
    withCrud
}