const router = require('express').Router();
const {models} = require('../db');

router.get('/', async (req,res) => {
    const edition = await models.edition.findAll();
    return res.json(edition);
});

router.delete('/:id', async(req, res) => {

    const {id} = req.params;
    const results = await models.edition.findAll({where:{id}});

    if(Object.keys(results).length <= 0)
        return res.json({});
    
    try{
        await models.edition.destroy({where:{id}});

    }catch(err){
        console.log(err);
    }
    
    return res.json(results);
});

router.post('/', async(req,res) =>{

    const {title} = req.body;

    await models.edition.create({title});

    return res.send("Edition created");
});

module.exports = router;