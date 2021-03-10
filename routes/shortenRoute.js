const expess = require("express");
const {
  shortenPostController,
  shortenGetController,
} = require("../controlllers/shortenController");

const Router = expess.Router();

Router.post("/", shortenPostController);
Router.get("/:id", shortenGetController);

module.exports = Router;
