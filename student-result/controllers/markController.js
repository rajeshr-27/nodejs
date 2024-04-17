const asyncHandler = require('express-async-handler');
const Mark = require('../models/markModel');

//@desc Fetch Marks based on student
//Method GET /api/marks
//access public

const getMarks = asyncHandler(async(req,res) => {
    const {student_id,class_id} = req.query;
    console.log(student_id);
    const mongoose = require('mongoose');

    let match_where = {}    
    if(student_id) {
        match_where.student_id = new mongoose.Types.ObjectId(student_id)
    }
    if(class_id) {
        match_where.class_id = new mongoose.Types.ObjectId(class_id)
    }
    const marks = await Mark.aggregate([
        {
            $match: match_where
        },
        {
            $lookup:{
                from : 'students',
                localField: 'student_id',
                foreignField : '_id',
                as: 'student'
            }
        },
        {
            $lookup: {
                from: 'classes',
                localField: 'class_id',
                foreignField:'_id',
                as:'class'
            }
        },
        {
            $lookup: {
                from: 'subjects',
                localField:'subject_id',
                foreignField:'_id',
                as:'subject'
            }
        }
    ]);
    if(!marks){
        res.status(404);
        throw new Error('Data not found')
    }else {
        let overall_taken_mark = 0;
        let overall_total_mark = 0;
        marks.forEach((item,index) => {
            overall_taken_mark = parseFloat(overall_taken_mark) + parseFloat(item.mark)
            overall_total_mark = parseFloat(overall_total_mark) + parseFloat(item.total_mark)
        })
        const json_output = {
            status:1,
            marks:marks,
            overall_taken_mark:overall_taken_mark,
            overall_total_mark:overall_total_mark
        }
        res.status(200).json(json_output);
    }
   
})

//@desc Fetch Marks based on mark id
//Method GET /api/marks/:id
//access public

const getMark = asyncHandler(async(req,res) => {
     const {id} = req.params;
     const markdetails = await Mark.findById(id);
     console.log(markdetails);
     if(!markdetails){ 
        res.status(404);
        throw new Error('Mark not found');
     }
     const json_output = {
        status:1,
        markdetails: markdetails
     }
     res.status(200).json(json_output);   
})

//@desc Add Marks based on student and subject
//Method POST /api/marks/
//access public

const addMark = asyncHandler(async(req,res) => {
    const {student_id, class_id, subject_id, mark, total_mark} = req.body;
    if(!student_id || !class_id || !subject_id || !mark || !total_mark) {
        res.status(400);
        throw new Error('Please enter the mandatory fields');
    }
    await Mark.create(req.body);
    const json_output = {
        status:1,
        message:'Successfully Mark Created'
    }
   res.status(200).json(json_output);
})

//@desc Update Marks based on student and subject
//Method PUT /api/marks/:id
//access public

const updateMark = asyncHandler(async(req,res) => {
     const {id} = req.params;
     const {student_id, class_id, subject_id, mark, total_mark} = req.body;
    if(!student_id || !class_id || !subject_id || !mark || !total_mark) {
        res.status(400);
        throw new Error('Please enter the mandatory fields');
    }   
    const markdetails = await Mark.findById(id); 
    if(!markdetails){
        res.status(404); 
        throw new Error('Mark not found');
    }
    await Mark.findByIdAndUpdate(id,req.body);
    const json_output = {
        status:1,
        message:'Successfully Mark Updated'
    }
   res.status(200).json(json_output);
})

//@desc Delete Marks based on student and subject
//Method DELETE /api/marks/:id
//access public

const deleteMark = asyncHandler(async(req,res) => {
    const {id} = req.params;
    console.log(id);
    const markDetails = await Mark.findByIdAndDelete(id);
    console.log(markDetails+'test');
    if(!markDetails){
        console.log('yes');
        res.status(404);
         throw new Error('Mark not exist');
    }

    const markList = await Mark.find({});
    const json_output = {
        status:1,
        message:'succesfully mark deleted',
        marks: markList
    }

    res.status(200).json(json_output);
})

module.exports = {getMarks,getMark,addMark,updateMark,deleteMark};