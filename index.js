const express = require("express");
const cors = require("cors");



const config = require("./config/config");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use("/api/user", userRouter);

const port = config.app.port;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/./views/index.html");
})

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Something broken here"
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
