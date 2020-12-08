const router = require('express').Router();
const { withCrud } = require('../controllers/crud.controller');
const {models} = require('../db');


router.get('/:id/articles', async (req, res) => {
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
});

withCrud(router,models.author);

module.exports = router;