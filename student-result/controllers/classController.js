const asyncHandler = require('express-async-handler');
const Class = require('../models/classModel');
//@desc Class List
//route GET api/class
//Access public
const getClasses = asyncHandler(async(req,res) => {
    const classes = await Class.find({});
    if(classes.length == 0){
        res.status(404)

        throw new Error('Classes not found')
    }
    $json_output = {
        status:1,
        classes:classes
    }
    res.status(200).json($json_output);
})

//@desc fetch individual class
//method GET /api/class/:id
//access public

const getClass = asyncHandler(async(req,res)=>{
    const {id} = req.params; 

    const class_details = await Class.findById(id);

    if(!class_details){
        res.status(404);
        throw new Error('Class not found')
    }
    const json_output =  {
        status:1,
        class_details :class_details
    }
    res.status(200).json(json_output);

})

//@desc Add Classes
const addClass = asyncHandler(async(req,res)=> {
    const {class_name} =  req.body;
    if(!class_name){
        res.status(400);
        throw new Error('Please enter class name');
    }
    await Class.create({class_name});

    const json_output = {
        status:1,
        message:'Class Created successfully'
    }
    res.status(200).json(json_output);
})

//@desc update class

const updateClass = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const class_details =  await Class.findById(id);

    if(!class_details){
        res.status(404);
        throw new Error('Class not exist');
    }

    await Class.findByIdAndUpdate(id,req.body);

    
    const json_output = {
        status:1,
        message:'Class updated successfully'
        
    }

    res.status(200).json(json_output);
})

//desc delete Class
const deleteClass = asyncHandler(async(req,res)=> {
    const {id} = req.params;
    const class_details =  await Class.findById(id);
    if(!class_details){
        res.status(400);
        throw new Error('class not found')
    }

    await Class.findByIdAndDelete(id);
    const classList = await Class.find({});

    const json_output = {
        status:1,
        message: 'Class deleted successfully',
        class:classList
    }

    res.status(200).json(json_output);
})

module.exports = {getClasses,getClass,addClass, updateClass,deleteClass}