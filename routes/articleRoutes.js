const express=require("express");
const {protectRoute} = require("../middlewares/auth");
const {createArticleController,getArticleBySlugController} = require("../controllers/articleControllers");
const articleRouter=express.Router();
articleRouter.post("/",protectRoute, createArticleController);
articleRouter.get("/:article_slug",getArticleBySlugController);
module.exports = articleRouter