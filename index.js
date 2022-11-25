const express = require("express");
const cors = require("cors");


const config = require("./config/config");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

const port = config.app.port;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/./views/index.html");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
