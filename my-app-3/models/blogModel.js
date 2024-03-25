const mongoose = require('mongoose');

const blogScheme = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

const Blog = mongoose.model('Blog',blogScheme);

module.exports = Blog;