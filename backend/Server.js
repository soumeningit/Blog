const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const dbConnector = require('./config/dbConnect');
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const generalRoute = require("./routes/generalRoute");
const contentRoute = require("./routes/contentRoute");
const oauthRoute = require("./routes/OAuthRoute");
const profileRoute = require("./routes/profileRoute");
const passport = require("passport");
require("./config/passportInIt");
const llmRoute = require("./routes/llmRoute");
const feedbackRoute = require("./routes/feedbackRoute");

const PORT = process.env.PORT || 5002;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use(passport.initialize());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/general", generalRoute);
app.use("/api/v1/content", contentRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/auth", oauthRoute);
app.use("/api/v1/llm", llmRoute);
app.use("/api/v1/feedback", feedbackRoute);

app.get("/ping", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    })
});

dbConnector().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



