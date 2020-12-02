const articleRouter = require('./article.route');
const editionRouter = require('./edition.route');

module.exports = (app) => {
    app.use('/article', articleRouter);
    app.use('/edition', editionRouter);
}