const jwt=require("jsonwebtoken");
const protectRoute=(req,res,next)=>{
    try{
        let token=req.cookies.jwt;
    let decodedToken= jwt.verify(token, process.env.JWT_SECRET);
    if(decodedToken){
        req.userId=decodedToken.id;
        next();
    }
    }catch(err){
        res.status(500).json({
            message: err.message,
            status: "failure"

        })
    }
}
module.exports.protectRoute=protectRoute;