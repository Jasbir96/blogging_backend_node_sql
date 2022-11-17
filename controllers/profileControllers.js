
const userModel = require("../models/userModel")
const profileUserNameController = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await userModel.getEntity({ username });
        if (!user) {
            return res.status(404)
                .json({
                    status:"success",
                    message: "User not found"
                });

        }

        res.status(200).json({
            status: "success",
            message: user
        })

    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
const getAllprofileControllers=async(req,res)=>{
    try {
        const page=req.query.page||1;
        const size=req.query.size||10;

    const users= await userModel.getAll(page,size);
    if(users.length==0){
        return res.status(404).json({
            status: "failure",
            message: "No users found"
        })
    }
    res.status(200).json({
        status: "success",
        message:users
    })

    }catch(err){
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }

}

module.exports = { profileUserNameController
, getAllprofileControllers
}