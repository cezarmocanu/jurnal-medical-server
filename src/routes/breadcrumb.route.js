const router = require('express').Router();
const {response} = require('../controllers/utils.controller');
const _ = require('lodash');
const {models} = require('../db');
const {BREADCRUMB_PATHS} = require('../constants');



router.get(BREADCRUMB_PATHS.COLLECTION, async (req,res) => {
    try {

        const {id} = _.get(req, 'params', null);

        if (_.isNaN(id)){
            return response(res).badRequest();
        }

        const collection = await models.collection.findByPk(id);

        if (_.isNil(collection)) {
            return response(res).notFound();
        }

        return response(res).ok({collection});
    
    } catch (error) {
        return response(res).internalServerError({error})
    }
});

router.get(BREADCRUMB_PATHS.EDITION, async (req,res)=> {
    try {

        const {id} = _.get(req, 'params', null);

        if (_.isNaN(id)){
            return response(res).badRequest();
        }

        const result = await models.edition.findOne({
            where:{id},
            include: models.collection
        });

        if (_.isNil(result)) {
            return response(res).notFound();
        }

        const edition = _.omit(result.dataValues, 'collection');
        const collection = _.omit(result.collection.dataValues);

        return response(res).ok({
            collection,
            edition
        });

    } catch (error) {
        return response(res).internalServerError({error})
    }
});

router.get(BREADCRUMB_PATHS.ARTICLE, async (req,res)=> {
    try {

        const {id} = _.get(req, 'params', null);

        if (_.isNaN(id)){
            return response(res).badRequest();
        }

        const result = await models.article.findOne({
            where:{id},
            include: {
                    model: models.edition,
                    include: {
                        model: models.collection
                    }
            }
        });

        if (_.isNil(result)) {
            return response(res).notFound();
        }

        const article = _.omit(result.dataValues, 'edition');
        const edition = _.omit(result.edition.dataValues,'collection');
        const collection = result.edition.collection.dataValues;

        return response(res).ok({
            collection,
            edition,
            article
        });

    } catch (error) {
        return response(res).internalServerError({error})
    }
});

module.exports = router;