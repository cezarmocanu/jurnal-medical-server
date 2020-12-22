const _ = require('lodash');
const router = require('express').Router();
const {models} = require('../db');
const {withCrud} = require('../controllers/crud.controller');
const edition = require('../model/edition.model');
const {response} = require('../controllers/utils.controller');

withCrud(router, models.edition,edition);

router.get('/:editionId/articles', async (req,res) => {
    try {
        
        const params = _.get(req, 'params', null);
        
        const {editionId} = params;
        
        if (_.isNil(editionId)) {
            return response(res)
        }

        const entities = await models.article.findAll({where:{editionId}});

        if (!_.isArray(entities) || _.isEmpty(entities)) {
            return response(res).notFound([]);
        }
        
        return response(res).ok(entities);

    } catch(error) {
        return response(res).internalServerError({error})
    }
});

module.exports = router;