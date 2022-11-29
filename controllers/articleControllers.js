const articleModel=require("../models/articleModel");
const createArticleController=async (req,res)=>{
// all the required data is present
try{
    const { title, body, sub_title, tags } = req.body;
    if (title == undefined || body == undefined || tags == undefined || sub_title == undefined) {
        return res.status(400).json({
            status: "failure",
            message: "some required fileds are missing"
        })
    }
    // send the request to model 
    await articleModel.create({
        title,
        body,
        sub_title,
        tags,
        author_id: req.userId
    })
    // res with success
    res.status(201).json({
        status: "success",
        message: "article created successfully"
    })
}catch(err){
res.status(500).json({
    status: "failure",
    message: err.message
})
}

}
module.exports={createArticleController};