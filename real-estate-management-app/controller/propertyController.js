const asyncHandler = require('express-async-handler');
const multer = require('multer');
const Property= require('../models/propertyModel');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'uploads/');
    },
    filename:(req,file,cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({storage});
//Desc Get Property List
//Method GET /api/property/list
//Access Public
const getProperties = asyncHandler(async(req,res)=>{
    const propertyList = await Property.find({});
    const json_output = {
        status:1,
        message:'Fetch properties',
        properties: propertyList
    }
    res.status(200).json(json_output);
})

//Desc Add property
//Method POST /api/property/register
//Access Public
const addProperty = asyncHandler(async(req,res)=>{
    const postData = JSON.parse(req.body.data)
    const {title,desc,contact_no} = postData
    console.log(postData);  

    if(!title || !desc || !contact_no){ 
        res.status(404);
        throw new Error('Please enter validation fields');
    }
    if(req.file){
        postData.photo = req.file.filename
    }
    //create properties
    await  Property.create(postData);
    //fetch properties
    const propertyList = await Property.find({});
    const json_output = {
        status:1,
        message:'Successfully added property',
        properties: propertyList
    }
    res.status(200).json(json_output);
    // res.send('wait')
})

//Desc Update property
//Method PUT /api/property/register/:id
//Access Public
const updateProperty = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const PropertyInfo = await Property.findById(id);
    if(!PropertyInfo){
        res.status(404);
        throw new Error('Property Not Found');
    }
        const postData = JSON.parse(req.body.data)
        const {title,desc,contact_no} = postData
        console.log(postData);  


    if(!title || !desc || !contact_no){ 
        res.status(404);
        throw new Error('Please enter validation fields');
    }
    if(req.file){
        postData.photo = req.file.filename
    }
    //create properties
    await  Property.findByIdAndUpdate(id, postData);
    //fetch properties
    const propertyList = await Property.find({});
    const json_output = {
        status:1,
        message:'Successfully updated property',
        properties: propertyList
    }
    res.status(200).json(json_output);
})

//desc Delete property
//Method DELETE /api/property/:id
//Access Public
const deleteProperty = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const PropertyInfo = await Property.findById(id);
    if(!PropertyInfo){
        res.status(404);
        throw new Error('Property Not Found');
    }
    //delete property
    await Property.findByIdAndDelete(id)
    //fetch properties
    const propertyList = await Property.find({});
    const json_output = {
        status:1,
        message:'Successfully deleted property',
        properties: propertyList
    }
    res.status(200).json(json_output);
})

module.exports = {getProperties, addProperty, updateProperty,deleteProperty, upload}