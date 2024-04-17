const mongoose = require('mongoose');
const subjectSchema = mongoose.Schema({
    subject_name:{
        type:String,
        required:true
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Class'
    }
},
{
    timestamps:true
})

const Subject = mongoose.model('Subject',subjectSchema);
module.exports = Subject;