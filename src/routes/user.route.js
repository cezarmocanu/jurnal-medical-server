const router = require('express').Router();
const {models} = require('../db');
const {withCrud} = require('../controllers/crud.controller');
const user = require('../model/user.model');
const _ = require('lodash');
const {like: LIKE} = require('sequelize').Op;
const bcrypt = require('bcrypt');

const saltRounds = 10;

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
                }
            }
        }
    );

    if(_.isNil(existingUser)){
        return res.json({
            data:{
                message:`Email/Password incorrect or does not exist`
            }
        });
    }

    try {
        
       if(await bcrypt.compare(body.password, existingUser.password)) {
            return res.json({
                data:{
                    message: `Login successful for user: ${email}`
                }
            });
       } else {
            return res.json({
                data:{  
                    message:`Password is incorrect for user: ${email}`
                }
            });
       }

    } catch (error) {
        return res.json({data:{error}});
    }

});

router.post('/signUp', async (req,res)=> {

    try {

        const body = _.get(req, 'body', null);
        
        if (_.isNil(body) || _.isEmpty(body)){
            return res.json({data: {}});
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = user({email: body.email, password: hashedPassword});
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

        if(_.isEmpty(body.password)){
            return res.json({
            data:{
                message:"Password can't be null"
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

withCrud(router, models.user, user);

module.exports = router;