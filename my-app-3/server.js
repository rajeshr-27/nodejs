const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogModel');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename:function(req,file,cb) {
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});
app.get('/',(req,res) => {
    res.send('Node API');
});


//add blog
app.post('/blog', upload.single('image'), async (req, res) => {
    try{
        const post_data =JSON.parse(req.body.data);
        if(req.file){
            const {filename} = req.file;
            post_data.image = filename;
        } 
        //create
        await Blog.create(post_data);

        const json_output = {
            status:1,
            message: 'successfully created'
        }
        res.status(200).json(json_output);
    }catch(error){
        res.status(500).json({message:error})
    }
   
})

//get Blogs
app.get('/blogs', async (req,res) => {

    try{
        const blogs = await Blog.find({});

        const json_output = {
            status:1,
            blogs:blogs
        }

        res.status(200).json(json_output);

    }catch(error){
        res.status(500).json({message:error});
    }
})

//get Blog
app.get('/blogs/:id', async (req,res)=> {
    try{
        const {id} = req.params;
        //get blog details 
        const blog = await Blog.findById(id);

        const json_output = {
            status: 1,
            blog:blog
        }
        res.status(200).json(json_output);
    }catch(error){
        res.status(500).json({message:error});
    } 
});

//Update blog
app.put('/blog/:id', upload.single('image'), async (req,res) => {
    try{
        const {id}  = req.params;
        const post_data = JSON.parse(req.body.data);
        if(req.file){
            const {filename} = req.file;
            post_data.image = filename;
        }
        const blog = await Blog.findByIdAndUpdate(id,post_data);

        if(!blog){
            return res.status(404).json(`cannot find blog with this id ${id}`)
        }
        const json_output = {
            status:1,
            message:'succesfully updated'
        }
        res.status(200).json(json_output);
    }catch(error){
        res.status(500).json({message:error});
    }
})

//Delete blogs

app.delete('/blogs/:id', async (req, res) => {

    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if(!blog){
            return res.status(404).json({message:`cannot find blog this id ${id}`})
        }

        const blogs = await Blog.find({});

        const json_output = {
            status:1,
            message: 'successfully deleted',
            blogs:blogs
        }

        res.status(200).json(json_output);

    }catch(error){
        res.status(500).json({message:error})
    }
})

mongoose.connect('mongodb+srv://rajeshkphp27:Rajesh1234@cluster0.cebwtmf.mongodb.net/node-api-3?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('mongodb connected');
    app.listen(5000, () => {
        console.log('node api run with this port 5000')
    })
}).catch((error) => {
    console.log(error);
})



