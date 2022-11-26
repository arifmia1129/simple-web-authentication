const User = require("../models/user.model")
const md5 = require("md5");

exports.createUser = async (req, res) => {
    try {
        const user = new User({
            email: req.body.email,
            password: md5(req.body.password)
        });
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

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Provide email and password"
            })
        }

        const user = await User.findOne({ $and: [{ email }, { password: md5(password) }] });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email or password is invalid"
            })
        }

        res.status(200).json({
            success: true,
            message: "Logged in user",
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