const router = require('express').Router();
const {models} = require('../db');
const {withCrud} = require('../controllers/crud.controller');
const user = require('../model/user.model');
const _ = require('lodash');
const {like: LIKE} = require('sequelize').Op;

router.post('/login' , async(req,res)=> {

    const postBody = _.get(req, 'body', null);
    
    if(_.isNil(postBody) || _.isEmpty(postBody)){
        return res.json({data: {}});
    }

    const body = user(postBody);
    const {email, password} = body;

    if(_.isNil(email) || _.isNil(password) || _.isEmpty(email) || _.isEmpty(password)){
        return res.json({
            data:{
                message: "Don`t leave empty fields!"
            }
        });
    }

    const existingUser = await models.user.findOne(
        {
            where:{
                email:{
                    [LIKE]: email
                },
                password: {
                    [LIKE]: password
                }
            }
        }
    );
   
    if(_.isNil(existingUser)){
        return res.json({
            data:{
                message:`email/password incorrect or does not exist`
            }
        });
    }

    return res.json({
        data:{
            message: `Login successful for user: ${email}`
        }
    });

});


withCrud(router, models.user, user);

module.exports = router;