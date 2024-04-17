const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const multer  = require('multer');
const cors = require('cors'); 
const app = express();
connectDB(); 
app.use(cors());
app.use('/uploads', express.static('uploads')); 
// Parse application/json
app.use(bodyParser.json()); 
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
const upload = multer({storage:storage});
// app.post('/submit-form', upload.single('photo'), (req, res) => {    
//     console.log(req.body);
//     console.log(req.file);
//     // console.log(req.body); // Form data will be available in req.body
//     res.send('Form submitted successfully');
// });
app.use('/api/class',require('./routes/classRoutes'));
app.use('/api/subjects',require('./routes/subjectRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/marks',require('./routes/markRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
// app.use((err,req,res,next) => {
//     console.error(err);
//     res.status(500).json({error: 'Internal server error'});
// }) 
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`node server run this port ${port}`)
})