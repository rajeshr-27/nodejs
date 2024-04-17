const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');

const dotenv = require('dotenv').config();

const errorHandler = require('./middleware/errorHandler')

connectDB();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler);
app.listen(port, () => {
    console.log(`server run this port ${port}`);
})