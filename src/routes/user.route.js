const router = require('express').Router();
const {models} = require('../db');
const {withCrud} = require('../controllers/crud.controller');
const user = require('../model/user.model');
const _ = require('lodash');
const {like: LIKE} = require('sequelize').Op;

withCrud(router, models.user, user);

router.post('/signUp', async (req,res)=> {

    try {

        const body = _.get(req, 'body', null);
        
        if (_.isNil(body) || _.isEmpty(body)){
            return res.json({data: {}});
        }

        const newUser = user(body);
        const {email} = newUser;
        const existingUser = await models.user.findOne({where:{
            email:{
            [LIKE]: email
        }
        }});

        if(!_.isNil(existingUser)){
        return res.json({
            data:{  
                message:`${email} already exists! Choose another one!`
            }
        });
        };

        await models.user.create(newUser);
        
        return res.json({
            data:{
                message: `Account is created!`
            }
        });

    } catch (error) {
        return res.json({data:{error}});
    }

});


module.exports = router;