const router = require('express').Router();
const {models} = require('../db');

router.get('/', async (req, res) => {
    const articles = await models.article.findAll();
    return res.json(articles);
});

router.post('/', async (req, res) => {
    const {title} = req.body;

    await models.article.create({title});

    return res.send('article created');
});

module.exports = router;