const userModel =require("../models/userModel");
const bcrypt=require("bcrypt");

async function userSignupController(req, res) {
    try {
        // 1. check for every data that is required is present
        let userObj = req.body;
        if (userObj.username == undefined || userObj.password == undefined || userObj.email == undefined ||
            userObj.confirmPassword == undefined || userObj.bio == undefined) {
            return res.status(400).json({
                status: "failure",
                message: "missing required data"
            })
        }
        if (userObj.password != userObj.confirmPassword) {
            return res.status(400).json({
                status: "failure",
                message: "passwords and confirm do not match"

            })
        }
        //  2. send the data to DB -> to create user
        await userModel.create(userObj);
        // 3. send success response to the client  
        res.status(201).json({
            status: "success",
            message: "user created successfully"
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}

async function userLoginController(req,res){
    try{
    // 1. getting data -> email,password -> to check email and password are present or not
    const {email,password}=req.body;
    if (email == undefined || password == undefined) {
     return   res.status(400).json({
            status: "failure",
            message: "missing required data"
        })
    }
    // 2. we will finding our user -> email
const user=await  userModel.getEntity({email});
// X -> return user is not found
if(!user){
  return  res.status(404).json({
        status: "failure",
        message: "no user found kindly signup"
    })
}
// // 3. decrypt password==client password
        const result=await bcrypt.compare(password, user["password_hash"]);
        if(!result){
            return res.status(400).json({
                status: "failure",
                message: "password or email is not matching"
            })
        }
        res.status(200).json({
            status:"success",
            message:"user logged in successfully"
        })
}catch(err){
    res.status(500).json({
        status: "failure",
        err: err.message

    })
}






}
module.exports={userSignupController,
    userLoginController};