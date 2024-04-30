const express = require('express');
const dontEnv = require('dotenv').config();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/dbConnection');
const cors = require('cors')
const app = express();
connectDB();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.use('/api/chat', require('./routes/chatRoutes'));
// app.use((err,req,res,next)=>{
//     console.log(err);
// })
app.use(errorHandler);

const PORT = process.env.PORT ? process.env.PORT  :  5000;
app.listen(PORT,()=> {
    console.log("node server connect this port: ",PORT)
})