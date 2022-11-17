const express=require("express");
const profileRouter=express.Router();
const { profileUserNameController,getAllprofileControllers }
=require("../controllers/profileControllers");

profileRouter.get("/",
getAllprofileControllers);
profileRouter.get("/:username",profileUserNameController);
module.exports=profileRouter;