const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
    try {
        await mongoose.connect(config.db.url);
        console.log("DB is connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;