const mongoose = require("mongoose");
// const encrypt = require('mongoose-encryption');
const config = require("../config/config");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})




const User = mongoose.model("User", userSchema);

// const encKey = config.key.mongooseEncryption;

// userSchema.plugin(encrypt, { secret: encKey, encryptedFields: ["password"] });

module.exports = User;