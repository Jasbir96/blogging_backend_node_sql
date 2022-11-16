
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

module.exports = { profileUserNameController }