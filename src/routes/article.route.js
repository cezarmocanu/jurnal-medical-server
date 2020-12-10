const _ = require('lodash');
const { withCrud } = require('../controllers/crud.controller');
const router = require('express').Router();
const {like: LIKE} = require('sequelize').Op;
const {models} = require('../db');
const article = require('../model/article.model');

router.post('/hasAuthor', async (req, res) => {
    try {
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
    
    } catch (error) {
        return res.json({data:[error]});
    }
});

withCrud(router,models.article,article);

module.exports = router;