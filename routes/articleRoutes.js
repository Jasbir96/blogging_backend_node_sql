const express=require("express");
const { protectRoute, identifyIsSameUserMiddleware } = require("../middlewares/auth");
const {createArticleController,getArticleBySlugController,
    getAllController, updateArticleController
} = require("../controllers/articleControllers");
const articleRouter=express.Router();
articleRouter.get("/",getAllController);
articleRouter.post("/",protectRoute, createArticleController);
articleRouter.route("/:article_slug").
get(getArticleBySlugController)
.patch(protectRoute, identifyIsSameUserMiddleware, updateArticleController);
module.exports = articleRouter