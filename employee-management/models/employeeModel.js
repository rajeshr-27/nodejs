const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({

    employee_name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    date_of_birth:{
        type:String,
        required:true
    },
    marital_status:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    job_title:{
        type:String,
        required:true
    },
    height:{
        type:String,
        required:true
    },
    id_number:{
        type:String,
        required:true
    },
    contact_number:{
        type:Number,
        required:true
    },
    street_address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
},
{
    timestamps: true
})

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;