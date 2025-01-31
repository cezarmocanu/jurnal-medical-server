const articleRouter = require('./article.route');
const editionRouter = require('./edition.route');
const authorRouter = require('./author.route');
const keywordRouter = require('./keyword.route');
const collectionRouter = require('./collection.route');
const userRouter = require('./user.route');
const breadcrumbRouter = require('./breadcrumb.route');

module.exports = (app) => {
  app.use('/article', articleRouter);
  app.use('/edition', editionRouter);
  app.use('/author', authorRouter);
  app.use('/keyword', keywordRouter);
  app.use('/collection', collectionRouter);
  app.use('/user', userRouter);
  app.use('/breadcrumb', breadcrumbRouter);
};
