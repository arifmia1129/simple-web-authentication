const User = require("../models/user.model")
// const md5 = require("md5");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

exports.createUser = async (req, res) => {
    try {

        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            if (err) {
                return res.status(404).json({
                    success: false,
                    message: "Something broken",
                    error: err?.message
                })
            }
            const user = new User({
                email: req.body.email,
                password: hash
            });
            await user.save();
            res.status(201).json({
                success: true,
                message: "Create the user",
                user
            })
        });


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



        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email or password is invalid"
            })
        }

        bcrypt.compare(password, user?.password, function (err, result) {
            if (err) {
                return res.status(404).json({
                    success: false,
                    message: "Something broken",
                    error: err?.message
                })
            }
            res.status(200).json({
                success: true,
                message: "Logged in user",
                user
            })
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something broken here",
            error: error.message
        })
    }
}