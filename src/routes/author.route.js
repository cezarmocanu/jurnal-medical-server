const router = require('express').Router();
const {models} = require('../db');

router.get('/', async (req, res) => {
    const authors = await models.author.findAll();
    return res.json(authors);
});

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

router.post('/', async (req, res) => {
    const {firstName, lastName} = req.body;

    await models.author.create({firstName, lastName});

    return res.send('author created');
});

module.exports = router;