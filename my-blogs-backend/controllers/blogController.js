const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel');
//@desc Get all the Blogs
//API GET /api/blogs
//Access public

const getBlogs = asyncHandler( async (req,res) => {
    const blogs = await Blog.find({});
    if(blogs.length ==0){
        res.status(404);
        throw new Error('blog not found')
    }
    res.status(200).json(blogs);
})

//@desc Get individual Blog
//API GET /api/blogs/:id
//Access public

const getBlog = asyncHandler( async(req,res) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        res.status(404);
        throw new Error(`Cannot find the blog this id ${id}`)
    }

    res.status(200).json(blog);
})

//@desc Create individual Blog
//API POST /api/blogs/
//Access public

const createBlog = asyncHandler( async(req,res) => {
    const {title,description} = req.body;
    if(!title || !description){
        res.status(400);
        throw new Error('All fields Mandatory');
    }
    //Create blog
    const blogDetails = await Blog.create({
        title,
        description
    })

    res.status(200).json(blogDetails);
})

//@desc Update individual Blog
//API PUT /api/blogs/:id
//Access public

const updateBlog = asyncHandler( async(req,res) => {
    const {id} = req.params;
    console.log(id);
    const {title,description} = req.body;
    if(!title || !description){
        res.status(400);
        throw new Error('All fields Mandatory');
    }
    const blog = await Blog.findByIdAndUpdate(id,req.body);
    if(!blog){
        res.status(404);
        throw new Error(`cannot find blog this id ${id}`);
    }
    const blogDetails = await Blog.findById(id);

    res.status(200).json(blogDetails);
})

//@desc Delete individual Blog
//API DELETE /api/blogs/:id
//Access public

const deleteBlog = asyncHandler( async(req,res) => {
    const {id} = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if(!blog){
        res.status(404);
        throw new Error(`Cannot find blog this id ${id}`)
    }
    res.status(200).json(blog);
})

module.exports = {getBlogs, getBlog,createBlog,updateBlog,deleteBlog};