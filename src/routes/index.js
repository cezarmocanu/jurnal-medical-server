const articleRouter = require('./article.route');

module.exports = (app) => {
    app.use('/article', articleRouter);
}