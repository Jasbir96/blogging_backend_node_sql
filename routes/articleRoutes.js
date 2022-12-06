const express=require("express");
const { protectRoute, identifyIsSameUserMiddleware } = require("../middlewares/auth");
const {createArticleController,getArticleBySlugController,
    getAllController, updateArticleController,likeArticleController, dislikeArticleController
} = require("../controllers/articleControllers");
const articleRouter=express.Router();
articleRouter.get("/",getAllController);
articleRouter.post("/",protectRoute, createArticleController);
//***************article section *****/
articleRouter.route("/:article_slug").
get(getArticleBySlugController)
.patch(protectRoute, identifyIsSameUserMiddleware, updateArticleController);
/*************like and dislike section */
// ****************like and dislike section****************
articleRouter.route("/:article_slug/like")
    .get(protectRoute, likeArticleController);
articleRouter.route("/:article_slug/dislike")
    .get(protectRoute, dislikeArticleController);


module.exports = articleRouter;