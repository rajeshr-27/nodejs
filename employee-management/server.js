const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const app = express();

connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use('/api/employee', require('./routes/employeeRoute'));

// app.use((err,req,res,next) => {
//     if(err){
//         res.status(400);
//         throw new Error(err)
//     }
    
// })
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port,()=> {
    console.log('node server run this port ',port);
})