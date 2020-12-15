const router = require('express').Router();
const {response} = require('../controllers/utils.controller');
const _ = require('lodash');
const {models} = require('../db');
const {BREADCRUMB_PATHS} = require('../constants');
const collection = require('../model/collection.model');
const {COLLECTION, EDITION, ARTICLE} = BREADCRUMB_PATHS;

router.get(COLLECTION, async (req,res) => {
    try {

        const {id} = _.get(req, 'params', null);

        if (_.isNaN(id)){
            return response(res).badRequest();
        }

        const entity = await models.collection.findByPk(id);

        if (_.isNil(entity)) {
            return response(res).notFound();
        }

        return response(res).ok(entity);
    
    } catch (error) {
        return response(res).internalServerError({error})
    }
});

router.get(EDITION, async (req,res)=> {
    try {

        const {id} = _.get(req, 'params', null);

        if (_.isNaN(id)){
            return response(res).badRequest();
        }

        const entity = await models.edition.findOne({
            where:{id},
            include: models.collection
        });

        if (_.isNil(entity)) {
            return response(res).notFound();
        }

        const finalEntity = [{id: entity.collection.id, title: entity.collection.title}, {id: entity.id, title: entity.title, collectionId: entity.collectionId}];

        return response(res).ok(finalEntity);

    } catch (error) {
        return response(res).internalServerError({error})
    }
});

router.get(ARTICLE, async (req,res)=> {
    try {

        const {id} = _.get(req, 'params', null);

        if (_.isNaN(id)){
            return response(res).badRequest();
        }

        const entityArticle = await models.article.findOne({
            where:{id},
            include: models.edition
        });

        const entityEdition = await models.edition.findOne({
            where: id == entityArticle.editionId,
            include: models.collection
        });

        if (_.isNil(entityArticle)) {
            return response(res).notFound();
        }

       const finalEntity = [{id: entityEdition.collection.id, title: entityEdition.collection.title}, {id: entityEdition.id, title: entityEdition.title, collectionId: entityEdition.collectionId}, {id: entityArticle.id, title: entityArticle.title, editionId: entityArticle.editionId}];

        return response(res).ok(finalEntity);

    } catch (error) {
        return response(res).internalServerError({error})
    }
});

module.exports = router;