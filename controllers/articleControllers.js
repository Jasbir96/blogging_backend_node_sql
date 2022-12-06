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
const getArticleBySlugController =async (req,res)=>{
    try{
const articleSlug=req.params["article_slug"];
const article =await articleModel.getByEntity({slug:articleSlug});
if(article==null){
    res.status(404).json({
        status: "failure",
        message: "article not found"
    })
}else{
    res.status(200).json({
            status: "success",
            message: article,
            
        })
}

    }catch(err){
        return res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
const getAllController=async(req,res)=>{
    try{
// i need get data from the query params
const query=req.query;
// feed that to model 
const result=await articleModel.getAll(query);
// return the response 
res.status(200).json({
    status: "success",
    message:result
})
    }catch(err){
        return res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

module.exports={createArticleController,
    getArticleBySlugController,
    getAllController
};