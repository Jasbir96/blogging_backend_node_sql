const express=require("express");
const app=express();
app.use(express.json());
app.post("/users", function (req, res) {
    console.log("req body data", req.body);
    res.status(200).json({
        status: "success",
        message: "user created successfully"
    })
})
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