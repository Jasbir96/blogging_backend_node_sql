const {userSignupController} =require("../controllers/userControllers")
const userRouter = express.Router();
userRouter.post("", userSignupController);
module.exports=userRouter;