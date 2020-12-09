const router = require('express').Router();
const {models} = require('../db');
const {withCrud} = require('../controllers/crud.controller');
const keyword = require('../model/keyword.model');

withCrud(router, models.keyword, keyword);

module.exports = router;