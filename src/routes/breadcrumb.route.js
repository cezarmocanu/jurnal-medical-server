const router = require('express').Router();
const {breadcrumbController} = require('../controllers/breadcrumb.controller');

breadcrumbController(router);

module.exports = router;