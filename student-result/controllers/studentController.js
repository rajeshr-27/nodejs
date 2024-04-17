const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel')
const multer  = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});
const upload = multer({storage:storage});

//@desc Fetch students
//method get /api/students
//access public

const getStudents = asyncHandler( async(req,res) => {
   // console.log(req.file);
   const {class_id} = req.query
   let where = {}
   if(class_id){
      where = {
        class_id:class_id
      }
   } 
  //  console.log(req.body);
  const students = await Student.find(where).populate('class_id','class_name');
  const json_output = {
    status:1,
    students:students
  }
  res.status(200).json(json_output);
})

//@desc Fetch student
//method get /api/students/:id
//access public

const getStudent = asyncHandler( async(req,res) => {
  const {id} = req.params;
  const student_details = await Student.findById(id).populate('class_id','class_name');
  
  const json_output = {
    status:1,
    student_details:student_details
  }
  res.status(200).json(json_output);
})

//desc Fetch student
//method get /api/students/roll
//access public

const getStudentByRollno = asyncHandler(async(req,res) => {
  
    const {roll_no} = req.query;
    const student_details = await Student.findOne({roll_no: roll_no}).populate('class_id','class_name');
    
    if(!student_details){
      res.status(404);
      throw new Error('data not found')
    }else {
      const json_output = {
        status:1,
        student_details:student_details
      }
      res.status(200).json(json_output);
    }
   
})

//@desc Fetch student by Roll no
//method get /api/students?roll_no
//access public



//@desc Add student
//method post /api/students/
//access public

const addStudent = asyncHandler(  async(req,res) => {
  post_data = JSON.parse(req.body.data);
  console.log(post_data);
  if(req.file){
   const {filename} = req.file;
   post_data.photo = filename;

  }
  const {first_name, last_name, email, mobile_number, gender, address, dob, class_id, roll_no}= post_data; 
  if(!first_name || !last_name || !email || !mobile_number || !gender || !dob || !class_id || !roll_no){
    res.status(400);
    throw new Error('Please eneter the mandatory field');
  }
  //check email already exist or not
  const checkEmail = await Student.findOne({email:email});
  if(checkEmail){
    res.status(403);
    throw new Error('Email already exist');
  }

  //check roll_no already exist or not
  const checkRollno = await Student.findOne({roll_no:roll_no})
if(checkRollno){
  res.status(403);
  throw new Error('Rollno already exist');
}  
  //Create student
  await Student.create(post_data);

  const json_output = {
    status:1,
    message: 'Student created successfully'
  }
  res.status(200).json(json_output);
})

//@desc update student
//method put /api/students/:id
//access public

const updateStudent = asyncHandler( async(req,res) => {
    const {id} = req.params;

    const post_data = JSON.parse(req.body.data);

    const {first_name, last_name, email, mobile_number, gender, address, dob, class_id, roll_no}= post_data; 
    if(!first_name || !last_name || !email || !mobile_number || !gender || !dob || !class_id || !roll_no){
      res.status(400);
      throw new Error('Please eneter the mandatory field');
    }

    const checkEmail = await Student.findOne({email:email});
    if(checkEmail){
      if(checkEmail.id != id){
        res.status(403);
        throw new Error('Email already exist');
      }
    }

    //check roll no already exist or not
    const checkRollno = await Student.findOne({roll_no:roll_no});
    if(checkRollno){
      if(checkRollno.id != id){
        res.status(403);
        throw new Error('Rollno already exist');
      }
    }
    if(req.file){
      const {filename} = req.file;
      post_data.photo = filename;   
     }     
    await Student.findByIdAndUpdate(id,post_data);
    const json_output = {
      status:1,
      message:'Student updated successfully'
    }
    res.status(200).send(json_output);
})

//@desc delete student
//method delete /api/students/:id
//access public

const deleteStudent = asyncHandler( async(req,res) => {
    const {id} = req.params;
    const checkStudent = await Student.findById(id);
    if(!checkStudent){
      res.status(404);
      throw new Error('Student is not exist');
    }

    await Student.findByIdAndDelete(id);

    const studentList = await Student.find({}).populate('class_id','class_name');

    const json_output = {
      status:1,
      message:'Student deleted successfully',
      students: studentList
    }
    res.status(200).json(json_output);
})

module.exports = {getStudents,getStudent,addStudent,updateStudent,deleteStudent,getStudentByRollno,upload} 
