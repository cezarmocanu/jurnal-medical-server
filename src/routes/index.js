<<<<<<< HEAD
const articleRouter = require('./article.route');
const editionRouter = require('./edition.route');
const authorRouter = require('./author.route');
const keywordRouter = require('./keyword.route');
const collectionRouter = require('./collection.route');

module.exports = (app) => {
    app.use('/article', articleRouter);
    app.use('/edition', editionRouter);
    app.use('/author', authorRouter);
    app.use('/keyword', keywordRouter);
    app.use('/collection', collectionRouter);
}
=======
const articleRouter = require("./article.route");
const editionRouter = require("./edition.route");
const authorRouter = require("./author.route");
const keywordRouter = require("./keyword.route");
const collectionRouter = require("./collection.route");

module.exports = (app) => {
  app.use("/article", articleRouter);
  app.use("/edition", editionRouter);
  app.use("/author", authorRouter);
  app.use("/keyword", keywordRouter);
  app.use("/collection", collectionRouter);
};
>>>>>>> 97b802ed75590eb897a98cc926b9f7f26eb1bcfe
