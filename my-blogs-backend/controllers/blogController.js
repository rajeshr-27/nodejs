const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel');
//@desc Get all the Blogs
//API GET /api/blogs
//Access private

const getBlogs = asyncHandler( async (req,res) => {
    const blogs = await Blog.find({user_id:req.user.id});
    if(blogs.length ==0){
        res.status(404);
        throw new Error('blog not found')
    }
    res.status(200).json(blogs);
})

//@desc Get individual Blog
//API GET /api/blogs/:id
//Access private

const getBlog = asyncHandler( async(req,res) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        res.status(404);
        throw new Error(`Cannot find the blog this id ${id}`)
    }

    if(blog.user_id != req.user.id){
        res.status(403);
        req.statusCode = 403;
        throw new Error(`you dont have permission to access this blog ${id}`)
    }

    res.status(200).json(blog);
})

//@desc Create individual Blog
//API POST /api/blogs/
//Access private

const createBlog = asyncHandler( async(req,res) => {
    const {title,description} = req.body;
    if(!title || !description){
        res.status(400);
        throw new Error('All fields Mandatory');
    }
    //Create blog
    const blogDetails = await Blog.create({
        user_id:req.user.id,
        title,
        description
    })

    res.status(200).json(blogDetails);
})

//@desc Update individual Blog
//API PUT /api/blogs/:id
//Access private

const updateBlog = asyncHandler( async(req,res) => {
    const {id} = req.params;
    const {title,description} = req.body;
    if(!title || !description){
        res.status(400);
        throw new Error('All fields Mandatory');
    }
    let blogDetails = await Blog.findById(id);
    console.log(blogDetails);
    if(blogDetails.user_id != req.user.id){
        req.statusCode = 403;
        throw new Error(`you dont have permission to access this blog ${id}`)
    }

    const blog = await Blog.findByIdAndUpdate(id,req.body);
    if(!blog){
        res.status(404);
        throw new Error(`cannot find blog this id ${id}`);
    }
     blogDetails = await Blog.findById(id);

    res.status(200).json(blogDetails);
})

//@desc Delete individual Blog
//API DELETE /api/blogs/:id
//Access private

const deleteBlog = asyncHandler( async(req,res) => {
    const {id} = req.params;
    let blogDetails = await Blog.findById(id);
    if(!blogDetails){
        res.status(404);
        req.statusCode = 404
        throw new Error(`Cannot find blog this id ${id}`)
    }
    console.log(blogDetails);
    if(blogDetails.user_id != req.user.id){
        res.status(403);
        req.statusCode = 403
        throw new Error(`you dont have access this id ${id}`)
    }
    const blog = await Blog.findByIdAndDelete(id);
    
    res.status(200).json(blog);
})

module.exports = {getBlogs, getBlog,createBlog,updateBlog,deleteBlog};