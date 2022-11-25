const User = require("../models/user.model")

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            success: true,
            message: "Create the user",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something broken here",
            error: error.message
        })
    }
}