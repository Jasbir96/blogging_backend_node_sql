const express=require("express");
const {protectRoute} = require("../middlewares/auth");
const {createArticleController} = require("../controllers/articleControllers");
const articleRouter=express.Router();
articleRouter.post("/",protectRoute, createArticleController);
module.exports = articleRouter