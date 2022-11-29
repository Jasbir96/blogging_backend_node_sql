const express=require("express");
const { userSignupController, userLoginController, 
    followController, 
    unfollowController} =require("../controllers/userControllers");
const { protectRoute } = require("../middlewares/auth");
const userRouter = express.Router();
userRouter.post("", userSignupController);
userRouter.post("/login",userLoginController);
// only logged in user should be able to follow /unfollow
userRouter.post("/unfollow",
protectRoute, unfollowController);
userRouter.post("/follow", protectRoute, followController);

module.exports=userRouter;