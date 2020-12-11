const _ = require('lodash');
const { withCrud } = require('../controllers/crud.controller');
const router = require('express').Router();
const {like: LIKE} = require('sequelize').Op;
const {models} = require('../db');
const article = require('../model/article.model');

withCrud(router,models.article,article);

module.exports = router;