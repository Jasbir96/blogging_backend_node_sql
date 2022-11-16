const express=require("express");
const profileRouter=express.Router();
const { profileUserNameController }
=require("../controllers/profileControllers");
const { protectRoute } = require("../middlewares/auth");
profileRouter.get("/:username",protectRoute,profileUserNameController);
module.exports=profileRouter;