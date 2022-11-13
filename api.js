const express=require("express");
const app=express();
app.use(function(req,res){
res.status(404).json({
    status:"failure",
    message:"no matching route found"
})
})
app.listen(3000,()=>{
    console.log("listening on port 3000");
})