const router = require('express').Router();
const {like: LIKE} = require('sequelize').Op;
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


router.post('/hasAuthor', async (req, res) => {
    const {firstName, lastName} = req.body.author;
    const {title} = req.body.article;

    const author = await models.author.findOne({
        where:{
            firstName: { 
                [LIKE] : `%${firstName}%`
            },
            lastName : { 
                [LIKE] : `%${lastName}%`
            }
        }
    });

    //lodash typecheck
    if (author.firstName === undefined) {
        return {};
    }

    const article = await models.article.create({title});
    
    await author.addArticle(article);

    return res.json(article);
});

module.exports = router;