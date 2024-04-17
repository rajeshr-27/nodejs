const mongoose = require('mongoose');

const  studentSchema = mongoose.Schema({

    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    mobile_number: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    photo: {
        type:String,
        required:false
    },
    address: {
        type:String,
        required:true
    },
    dob: {
        type:String,
        required:true
    },
    class_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Class'
    },
    roll_no: {
        type:String,
        required:true
    }
},
{
    timestamps: true
})
const Student = mongoose.model('Student',studentSchema);
module.exports = Student;