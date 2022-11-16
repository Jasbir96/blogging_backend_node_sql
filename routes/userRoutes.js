const express=require("express");
const { userSignupController, userLoginController } =require("../controllers/userControllers")
const userRouter = express.Router();
userRouter.post("", userSignupController);
userRouter.post("/login",userLoginController);
module.exports=userRouter;