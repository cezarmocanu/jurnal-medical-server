const router = require('express').Router();
const { withCrud } = require('../controllers/crud.controller');
const {models} = require('../db');
const author = require('../model/author.model');

withCrud(router,models.author,author);


module.exports = router;