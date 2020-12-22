const _ = require('lodash');
const router = require('express').Router();
const { models } = require('../db');
const { withCrud } = require('../controllers/crud.controller');
const collection = require('../model/collection.model');
const {response} = require('../controllers/utils.controller');

withCrud(router, models.collection,collection);

router.get('/:collectionId/editions', async (req,res) => {
    try {
        
        const params = _.get(req, 'params', null);
        
        const {collectionId} = params;
        
        if (_.isNil(collectionId)) {
            return response(res)
        }

        const entities = await models.edition.findAll({where:{collectionId}});

        if (!_.isArray(entities) || _.isEmpty(entities)) {
            return response(res).notFound([]);
        }
        
        return response(res).ok(entities);

    } catch(error) {
        return response(res).internalServerError({error})
    }
});

module.exports = router;
