const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const Product = require('./models/productModel');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.use('/uploads', express.static('uploads')); 

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
})

const upload = multer({storage:storage})

//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    res.send('Node API');
});
 
app.get('/blog', (req,res) => {
    res.send('blog');
})

//Add Product
app.post('/products',upload.single('image'),async (req,res) => {
    try{
        
        const post_data = JSON.parse(req.body.data);
        if(req.file){
            const {filename} = req.file;
            post_data.image = filename;
            console.log(filename);
        }
        console.log(post_data);
        await Product.create(post_data);
        const json_output = {
            status:1,
            message: 'Succesfully created'
        }
        res.status(200).json(json_output);

    }catch(error){
        res.status(500).json({message:error.message})
    }
}) 

//get Products

app.get('/products', async (req,res) => {
    

    try{
        const products = await Product.find({});
        const json_output = {
            status:1,
            products:products
        }
        res.status(200).json(json_output);
    }catch(error){
        res.status(500).json({message:error})
    }

})

//get product
app.get('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        const json_output = {
            status:1,
            product:product
        }

        res.status(200).json(json_output);
    }catch(error){
        res.status(500).json({message:error})
    }
})

//updat product
app.put('/products/:id', upload.single('image'), async(req,res) => {
    try{
        const {id} = req.params;
        const post_data = JSON.parse(req.body.data);
        if(req.file){
            const {filename} = req.file
            post_data.image = filename;
        }
        const product = await Product.findByIdAndUpdate(id,post_data);
        if(!product){
            return res.status(404).json({message:`cannot find any product with id ${id}`})
        }

        const json_output = {
            status:1,
            message: 'Product updated successfully'
        }

        res.status(200).json(json_output);
    }catch(error){
        res.status(500).json({message:error})
    }
})

mongoose.
connect('mongodb+srv://rajeshkphp27:Rajesh1234@cluster0.cebwtmf.mongodb.net/node-api-2?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('mongo db connected');
    app.listen(5000, () => {
        console.log('Node app api running on port no 5000')
    })
}).catch((error) => {
 console.log('error');
})