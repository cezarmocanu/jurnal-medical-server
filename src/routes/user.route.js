const router = require('express').Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {like: LIKE} = require('sequelize').Op;
const jwt = require('jsonwebtoken');

const {models} = require('../db');
const {withCrud} = require('../controllers/crud.controller');
const user = require('../model/user.model');
const {response} = require('../controllers/utils.controller');

const saltRounds = 10;
const accessTokenSecret = 'TokenSecret'

const authenticateToken = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    
    if(_.isNil(token)){
        return response(res).forbidden();
    }

   jwt.verify(token, accessTokenSecret, (err, user) =>{
        console.log(err);
        
        if(err){
            return response(res).forbidden();
        }

        req.user = user;
        next();
    }); 
};

const generateAccessToken = (username)=>{
    return jwt.sign(username, accessTokenSecret);
};

router.post('/login', authenticateToken, async(req,res)=> {
    const postBody = _.get(req, 'body', null);
    
    if(_.isNil(postBody) || _.isEmpty(postBody)){
        return response(res).badRequest();
    }

    const body = user(postBody);
    const {email, password} = body;

    if(_.isNil(email) || _.isNil(password) || _.isEmpty(email) || _.isEmpty(password)){
        return response(res).badRequest({
            message: "Don`t leave empty fields!"
        });
    }

    const existingUser = await models.user.findOne({
        where:{
            email:{
                [LIKE]: email
            }
        }
    });

    if(_.isNil(existingUser)){
        return response(res).notFound({
            message:`Email/Password incorrect or does not exist`
        })
    }

    try {
        const isAllowed = await bcrypt.compare(body.password, existingUser.password);

        if (!isAllowed) {
            return response(res).unauthorized({  
                message:`Password is incorrect for user: ${email}`
            });
        }

        return response(res).ok({
            message: `Login successful for user: ${email}`
        });

    } catch (error) {
        return response(res).internalServerError({error});
    }

});

router.post('/signUp', async (req,res)=> {

    try {

        const body = _.get(req, 'body', null);
        
        
        if (_.isNil(body) || _.isEmpty(body)){
            return response(res).badRequest();
        }

        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        const newUser = user({email: body.email, password: hashedPassword});
        const {email} = newUser;

        const existingUser = await models.user.findOne({
            where:{
                email:{
                    [LIKE]: email
                }
            }
        });

        if(!_.isNil(existingUser)){
            return response(res).conflict({  
                message: `${email} already exists! Choose another one!`
            });
        };

        if(_.isEmpty(body.password)){
            return response(res).badRequest({
                message:"Password can't be null"
            })
        };

        await models.user.create(newUser);
        const token = generateAccessToken({user: email});

        return response(res).ok({
            message: `Account is created! ${token}`
        });

    } catch (error) {
        return response(res).internalServerError({error})
    }

});

withCrud(router, models.user, user);

module.exports = router;