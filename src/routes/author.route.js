const router = require('express').Router();
const { withCrud } = require('../controllers/crud.controller');
const {models} = require('../db');
const author = require('../model/author.model');

router.get('/:id/articles', async (req, res) => {
    try {
        const {id} = req.params;
        const author = await models.author.findOne({
            where:{id},
            include: models.article
        });

        //TODO: Add lodash typechecking
        if (author === undefined || author.firstName === undefined) {
            return res.json([]);
        }
    
        const articles = await author.getArticles();

        if (articles.length <= 0) {
            return res.json([]);
        }

        return res.json(articles);
    
    } catch (error) {
        return res.json({data:[error]});    
    }
});

withCrud(router,models.author,author);


module.exports = router;