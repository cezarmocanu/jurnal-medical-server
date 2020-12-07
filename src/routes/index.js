const articleRouter = require("./article.route");
const editionRouter = require("./edition.route");
const authorRouter = require("./author.route");
const collectionRouter = require("./collection.route");

module.exports = (app) => {
  app.use("/article", articleRouter);
  app.use("/edition", editionRouter);
  app.use("/author", authorRouter);
  app.use("/collection", collectionRouter);
};
