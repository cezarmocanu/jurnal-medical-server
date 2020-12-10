const router = require('express').Router();
const {models} = require('../db');
const {withCrud} = require('../controllers/crud.controller');
const edition = require('../model/edition.model');

withCrud(router, models.edition,edition);

module.exports = router;