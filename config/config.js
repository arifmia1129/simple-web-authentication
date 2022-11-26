require("dotenv").config();

const dev = {
    app: {
        port: process.env.PORT || 8080
    },
    db: {
        url: process.env.DB_URL || "mongodb://localhost:27017/userAuthDB"
    },
    key: {
        mongooseEncryption: process.env.SECRET_KEY
    }
}

module.exports = dev;