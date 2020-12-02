const articleRouter = require('./article.route');
const editionRouter = require('./edition.route');
const authorRouter = require('./author.route');

module.exports = (app) => {
    app.use('/article', articleRouter);
    app.use('/edition', editionRouter);
    app.use('/author', authorRouter);
}