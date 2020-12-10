const router = require('express').Router();
const { models } = require('../db');
const { withCrud } = require('../controllers/crud.controller');
const collection = require('../model/collection.model');

withCrud(router, models.collection,collection);

module.exports = router;
