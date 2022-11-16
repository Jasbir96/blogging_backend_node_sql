const userModel =require("../models/userModel");

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
module.exports={userSignupController};