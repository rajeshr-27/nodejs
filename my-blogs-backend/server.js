const express = require('express');
const dontenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
connectDB();
const app = express();

const port = (process.env.PORT) ? process.env.PORT : 5000;
app.use(express.json());

app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);
app.listen(port,() => {
    console.log(`Node Js Server run this port ${port}`)
})