const express=require("express");
const app=express();
const userModel=require("./models/userModel.js");
app.use(express.json());


app.post("/users", userSignupController)

async function userSignupController(req, res) {
    try{
// 1. check for every data that is required is present
let userObj=req.body;
if(userObj.username==undefined||userObj.password==undefined||userObj.email==undefined||
    userObj.confirmPassword==undefined||userObj.bio==undefined){
        res.status(400).json({
            status:"failure",
            message:"missing required data"
        })
    } 
//  2. send the data to DB -> to create user
    await userModel.create(userObj);
// 3. send success response to the client  
res.status(201).json({
    status:"success",
    message:"user created successfully"
})
    }catch(err){
        res.status(500).json({
            status:"failure",
            err:err.message
        })
    }
}


// 404 page not found  
app.use(function (req, res) {
    return res.status(404).json({
        status: "failure",
        message: "no matching route found"
    })
})



app.listen(3000,()=>{
    console.log("listening on port 3000");
})