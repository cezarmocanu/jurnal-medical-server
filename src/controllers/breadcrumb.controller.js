const {response} = require('./utils.controller');
const _ = require('lodash');
const {models} = require('../db');

const breadcrumbController = (router) => {

    router.get('/collection/:id', async (req,res) => {
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

    router.get('/edition/:id', async (req,res)=> {
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

            return response(res).ok(entity);

        } catch (error) {
            return response(res).internalServerError({error})
        }
    });

    router.get('/article/:id', async (req,res)=> {
        try {

            const {id} = _.get(req, 'params', null);

            if (_.isNaN(id)){
                return response(res).badRequest();
            }

            const entity = await models.article.findOne({
                where:{id},
                include: models.edition
            });

            if (_.isNil(entity)) {
                return response(res).notFound();
            }

            return response(res).ok(entity);

        } catch (error) {
            return response(res).internalServerError({error})
        }
    });

    return router;
};

module.exports = {
    breadcrumbController
}