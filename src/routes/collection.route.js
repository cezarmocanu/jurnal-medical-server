const router = require("express").Router();
const { models } = require("../db");
const { withCrud } = require("../controllers/crud.controller");

withCrud(router, models.edition);

module.exports = router;
