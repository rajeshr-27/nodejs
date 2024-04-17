const mongoose = require('mongoose');
const markSchema = mongoose.Schema({
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Class'
    },
    subject_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Subject'
    },
    mark:{
        type:String,
        required:true
    },
    total_mark:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const Mark = mongoose.model('Mark',markSchema);
module.exports = Mark;