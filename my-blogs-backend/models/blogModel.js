const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:[true,'Please enter the title']
    },
    description:{
        type:String,
        required:[true,'Please enter the description']
    }
},
{
    timestamps :true
}
);

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;