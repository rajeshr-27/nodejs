const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req, file,cb){
        cb(null,file.originalname)
    }
})

const uploads = multer({storage})   
//@desc Employee List
//Method GET  /api/employee/list
//Access Public

const getEmployees = asyncHandler( async (req,res)=> {
    const employees = await Employee.find({});
    const json_output = {
        status:1,
        message:'success',
        employees:employees
    }
    res.status(200).json(json_output);
} )

//@desc Employee Details
//Method GET /api/employee/:id
//Access Public

const getEmployee = asyncHandler( async (req,res)=> {
    const {id} = req.params;
   
    const employeeInfo = await Employee.findById(id);
    if(!employeeInfo){
        res.status(404);
        throw new Error('Employee Not Found');
    }
    const json_output = {
        status:1,
        message:'success',
        employee:employeeInfo
    }
    res.status(200).json(json_output);
})

//@desc Register Employee
//Method POST /api/employee/register
//Access Public

const registerEmployee = asyncHandler( async (req,res)=> {
    const postData = JSON.parse(req.body.data)
    if(req.file){
       const  {filename} = req.file;
       postData.photo = filename
    }
    //Destruct the body
    const {employee_name, gender,date_of_birth, marital_status, education, job_title, height,id_number,contact_number,street_address,city,state,country,pincode,email,password} = postData;
    
    //Validation for mandatory fields
    if(!employee_name || !gender || !date_of_birth || !marital_status || !education || !job_title || !height || !id_number || !contact_number || !street_address || !city || !state || !country || !pincode || !email || !password){
        res.status(400);
        throw new Error('Please Enter Mandatory Fields')
    }

    //check Email validation
    const checkEmail = await Employee.findOne({email:email});
    if(checkEmail){
        res.status(400);
        throw new Error('Email Already Exist')
    }
    const hashPassword = await bcrypt.hash(password,10);
    postData.password = hashPassword;

    //Create Employee
    await Employee.create(postData);

    const json_output = {
        status:1,
        message:"Employee created successfully"
    } 
   // console.log(req.body);
    res.status(200).json(json_output);
})

//@desc Update Employee
//Method PUT /api/employee/register/:id
//Access Public

const updateEmployee = asyncHandler( async (req,res)=> { 
    const {id} = req.params;
    postData= JSON.parse(req.body.data);
    console.log(postData);
     //Destruct the body
     const {employee_name, gender,date_of_birth, marital_status, education, job_title, height,id_number,contact_number,street_address,city,state,country,pincode,email} =postData;
    
     //Validation for mandatory fields
     if(!employee_name || !gender || !date_of_birth || !marital_status || !education || !job_title || !height || !id_number || !contact_number || !street_address || !city || !state || !country || !pincode || !email){
         res.status(400);
         throw new Error('Please Enter Mandatory Fields')
     }
     const employeeInfo = await Employee.findOne({email:email});
     if(employeeInfo && (employeeInfo.id != id)){
        res.status(400);
        throw new Error('Email already exist');
     }

     if(req.file){
        postData.photo = req.file.filename;
     }

     //update
     await Employee.findByIdAndUpdate(id,postData);
     const json_output = {
        status:1,
        message:'Employee Updated Successfully'
     }
    res.status(200).json(json_output);
})

//@desc Delete Employee
//Method GET /api/employee/:id
//Access Public

const deleteEmployee = asyncHandler( async (req,res)=> {
    const {id} = req.params;
    const EmployeeInfo = await Employee.findByIdAndDelete(id);
    if(!EmployeeInfo){
        res.status(404);
        throw new Error('Employee not found');
    }

    //fetch employees 
    const employees = await Employee.find({});

    const json_output = {
        status:1,
        message:'Employee Deleted Successfully',
        employees:employees
    }

    res.status(200).json(json_output);
} )


module.exports = {getEmployees,getEmployee,registerEmployee,updateEmployee,deleteEmployee,uploads}