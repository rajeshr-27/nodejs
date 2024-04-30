const express = require('express');
const connectDB = require('./config/dbConnection');

const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const app = express();
connectDB();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'))

app.use('/api/restaurant', require('./routes/restaurantRoute'));

app.use((err,req,res,nex) => {
    console.log(err);
})
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('Node server run this port ',PORT);
})