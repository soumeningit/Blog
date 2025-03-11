const express = require('express');
const app = express();
const cors = require('cors');
const { connectDB } = require('./Config/dbConnector');
const authRoute = require('./Route/AuthRoute');
const categoryRoute = require("./Route/CategoryRoute");
const subCategoryRoute = require("./Route/SubCategoryRoute");
const blogRoute = require('./Route/BlogRoute');
const searchRoute = require('./Route/SearchRoute');
const commentRoute = require('./Route/CommentRoute');
const fileUpload = require('express-fileupload');
const profileRoute = require('./Route/ProfileRoute');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5000',
    'http://localhost:5000',
    'http://localhost:4000',
    'http://localhost:4001',
    'blogapp-3peamr9op-soumen-pals-projects.vercel.app',
    'blogapp-tau-flame.vercel.app',
    'https://blog-vu5d.onrender.com'
];

app.use(cors(
    {
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    }
));

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/sub-category', subCategoryRoute);
app.use('/api/blog', blogRoute);
app.use('/api/search', searchRoute);
app.use('/api/comment', commentRoute);
app.use('/api/profile', profileRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});