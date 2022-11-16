const express=require("express");
const app=express();
const userRouter=require("./routes/userRoutes");
const profileRouter=require("./routes/profileRoutes");

// 1. data 
app.use(express.json());
 app.use("/users",userRouter);
 app.use("/profile",profileRouter);
 


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