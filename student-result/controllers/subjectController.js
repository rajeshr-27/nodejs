const asyncHandler = require('express-async-handler');
const Subject = require('../models/subjectModel'); 
//@desc get subjects
//metheod get /api/subjects/
//access public
const getSubjects = asyncHandler(async(req,res)=> {
    const {class_id} = req.query;
    let where = {};
    if(class_id){
        where.class_id = class_id
    }

    //pagination
    const page = parseInt(req.query.page)-1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    if(search){
        where.subject_name = {
                $regex:search,
                $options:"i" 
        }
        // where.$or= [
        //     { subject_name: search, $options:"i" }             
        //   ]
    }
    const sort = req.query.sort || "Desc";

    const subjects = await Subject.find(where).populate('class_id', 'class_name')
    .sort(sort)
    .skip(page * limit)
    .limit(limit);

    const total = await Subject.countDocuments(where)
    const json_output = {
        status:1,
        total: total,
        page:page+1,
        limit:limit,
        subjects:subjects
    }
    res.status(200).json(json_output);
})

//@desc get subject
//metheod get /api/subjects/:id
//access public
const getSubject = asyncHandler(async(req,res)=> {
    const {id} = req.params;
    const subject_details = await Subject.findById(id);
    if(!subject_details){
        res.status(404);
        throw new Error('Subject not exist');
    }
    const json_output = {
        status:1,
        subject_details:subject_details
    }
    res.status(200).json(json_output);
})

//@desc Add subject
//metheod post /api/subjects/
//access public
const addSubject = asyncHandler(async(req,res)=> {
     const {subject_name,class_id} = req.body;

     if(!subject_name){
        res.status(400);
        throw new Error('Please enter the subject name')
     }
     await Subject.create({subject_name:subject_name,class_id:class_id});

     const json_output = {
        status:1,
        message:'Subject created successfully'
     }
     res.status(200).json(json_output)
})

//@desc update subject
//metheod put /api/subjects/:id
//access public
const updateSubject = asyncHandler(async(req,res)=> {
    const {id} = req.params;
    const subject_details = await Subject.findById(id);

    if(!subject_details){
        res.status(404);
        throw new Error('Subject not found');
    }
    const {subject_name} = req.body;

    if(!subject_name){
        res.status(400);
        throw new Error('Subject name is mandatory')
    }

    await Subject.findByIdAndUpdate(id,req.body);

    const json_output = {
        status:1,
        message:'Subject updated successfully'
    }
    res.status(200).json(json_output);
})

//@desc delete subject
//metheod delete /api/subjects/:id
//access public
const deleteSubject = asyncHandler(async(req,res)=> {
     const {id} = req.params; 
     const subject_details = await Subject.findById(id);

    if(!subject_details){
        res.status(404);
        throw new Error('Subject not found');
    }

    await Subject.findByIdAndDelete(id);

    const subjectList = await Subject.find({});
    const json_output ={
        status:1,
        message:'Subject deleted successfully',
        subjects: subjectList
    }

    res.status(200).json(json_output);

})
module.exports = {getSubjects, getSubject, addSubject,updateSubject,deleteSubject}