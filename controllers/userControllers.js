const userModel =require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
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
     const token=  jwt.sign(user.id, process.env.JWT_SECRET);
     res.cookie("jwt",token,{
        httpOnly:true
     })
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
async function followController(req,res){
try{
let u_id=req.userId;
    let following_id = req.body.following_id;
    if(following_id == undefined){
       return res.status(400).json({
            status:"failure",
            message:"missing following_id"
        })
    }
    await userModel.follow(u_id,following_id);
    res.status(200).json({
        status:"succes",
        message:"user followed successfully"
    })
}catch(err){
    console.log(err)
    res.status(500).json({
        status: "failure",
        err: err.message

    })
}
}

async function unfollowController(req, res) {
    try {
        let u_id = req.userId;
        let following_id = req.body.following_id;
        if (following_id == undefined) {
          return   res.status(400).json({
                status: "failure",
                message: "missing following_id"
            })
        }
        await userModel.unfollow(u_id, following_id);
        res.status(200).json({
            status: "success",
            message: "user unfollowed successfully"
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message

        })
    }

}
module.exports={userSignupController,
    userLoginController,
followController,
unfollowController
};