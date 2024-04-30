 const express = require('express');
 const dontEnv = require('dotenv').config();
 const bodyParser = require('body-parser');
 const errorHandler = require('./middleware/errorHandler');
 const connectDB = require('./config/dbConfig');
 const cors = require('cors');
 const app = express();

 connectDB();
 app.use(cors());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));
 app.use('/uploads',express.static('uploads'))
 //route

 app.use('/api/property', require('./routes/propertyRoute'));

 app.use((err,req,res,next)=> {
    console.log(err);
 })
 app.use(errorHandler);
 const PORT = process.env.PORT ? process.env.PORT : 5000
 app.listen(PORT, ()=> {
    console.log('Node server connected ', PORT);
 })