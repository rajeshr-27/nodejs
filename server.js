const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({extended:false}))

app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // Use the original file name for storage
    }
  });

const upload = multer({storage: storage})
//route
app.get('/',(req, res) => {
    res.send('Hello Node API');
})

app.get('/blog', (req,res) => {
    res.send('Hello Node blogs1');
})

app.get('/products', async(req, res) => {
    try {
        const Products = await Product.find({});
        res.status(200).json(Products);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
})
app.post('/product', async(req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//Update product
app.put('/product/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).json({message: `cannot find any product with id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

//Delete Product
app.delete('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message: `Cann't find any product with id ${id}`});
        }
        res.status(200).json(product);
    }catch(error) {
        res.status(500).json({message:error.message});
    }
})


app.post('/user', upload.single('photo'), async(req, res) => {
    try{

        const {id} = req.params;
        const post_data =  JSON.parse(req.body.data);
        
    //    const {email} = post_data;
        const checkEmail = await User.findOne({email:post_data.email});
        
        if(!checkEmail){

            if(req.file){
                const {filename,path} = req.file;
                post_data.photo = filename;           
            }
            
            const user = await User.create(post_data);
            const json_output = {
                status : 1,
                message: 'Registration successfully'
            }
            res.status(200).json(json_output);
        }else {
            const json_output = {
                status : 0,
                message: 'email id already exist'
            }
           
            res.status(200).json(json_output);
        }
      
    }catch(error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/users',async(req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error) {
        res.status(500).json({message:error.message});
    }

})

app.get('/user/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(error) {
        res.status(500).json({message:error.message})
    }
})

app.put('/user/:id',upload.single('photo'), async(req,res) => {
    try{
        const {id} = req.params;

        
        post_data =  JSON.parse(req.body.data);

        //validation check email already exit or not
        const userDetails = await User.findOne({email:post_data.email});
        if(userDetails){
            if(userDetails.id != id){
                const json_output = {
                    status:0,
                    message: 'Email already exist'
                }
               return res.status(200).json(json_output);
            }
        }
       
        if(req.file){
            const {filename,path} = req.file;
            post_data.photo = filename;           
        }
       
        const user = await User.findByIdAndUpdate(id, post_data);
        if(!user){
           return res.status(404).json({message: `Cann't find any user with id ${id}`});
        }
        //const updatedUsers = await User.findById(id);
         const json_output = {
            status:1,
            message: 'Updated successfully'
         }
        res.status(200).json(json_output);
    }catch(error) {
        res.status(500).json({message:error.message})
    }
})

app.delete('/user/:id', async (req,res) => {
    try {
         const {id} = req.params;

         const user = await User.findByIdAndDelete(id);

         if(!user){
           return res.status(404).json({message: `Can't find any user with id ${id}`})
         }

         res.status(200).json(user);
    }catch(error) {
        res.status(500).json({message:error.message});
    }
})


mongoose.
connect('mongodb+srv://rajeshkphp27:Rajesh1234@cluster0.cebwtmf.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('mongo db connected;');
    app.listen(4000, () => {
        console.log('Node API app is running on port 3000')
    })
}).catch((error) => {
    console.log(error);
}) 
