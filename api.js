const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
const userRouter=require("./routes/userRoutes");
const profileRouter=require("./routes/profileRoutes");
const articleRouter=require("./routes/articleRoutes");

// 1. data 
app.use(express.json());
app.use(cookieParser());
// user defined middleware
app.use(function(req, res,next){
let jwt=req.cookies.jwt;
console.log("jwt",jwt);
next()
;})

 app.use("/users",userRouter);
 app.use("/profiles",profileRouter);
 app.use("/articles",articleRouter);

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