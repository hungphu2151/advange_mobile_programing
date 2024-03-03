const express = require('express')
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const dotenv = require('dotenv');
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

const route = require('./routes');
const connectDatabase = require('./config/database')

const app = express()
const port = 3000

dotenv.config();
connectDatabase()

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'))
app.use(fileUpload());

// Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})