const express=require("express");
const profileRouter=express.Router();
const { profileUserNameController }
=require("../controllers/profileControllers")
profileRouter.get("/:username",profileUserNameController);
module.exports=profileRouter;