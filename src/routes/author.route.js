const router = require('express').Router();
const {models} = require('../db');

router.get('/', async (req, res) => {
    const authors = await models.author.findAll();
    return res.json(authors);
});

router.post('/', async (req, res) => {
    const {firstName, lastName} = req.body;

    await models.author.create({firstName, lastName});

    return res.send('author created');
});

module.exports = router;