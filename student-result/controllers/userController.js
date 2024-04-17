const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const { response } = require('express');
//@desc fetch all users
//Method get /api/users
//Access public

const getUsers = asyncHandler( async (req,res) => {
    const userList = await User.find({});
    const json_output = {
        status:1,
        userList: userList
    }

    res.status(200).json(json_output);
})

const getUser = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const userDetails = await User.findById(id);
    
    if(!userDetails){
        res.status(404);
        throw new Error('User not found');
    }

    const json_output = {
        status:1,
        userDetails:userDetails
    }
    res.status(200).json(json_output);
})

const addUser = asyncHandler( async (req,res) => {
   
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please enter the mandatory fields');
    }
    //check email aready exist or not
    const checkEmail = await User.findOne({email:email});
    if(checkEmail){
        res.status(400);
        throw new Error('Email address already exist')
    }

    const hashPassword =  await Bcrypt.hash(password,10)
    //create user
    await User.create({
        name,
        email,
        password:hashPassword
    })

    const json_output = {
        status:1,
        message: 'Successfully created user'
    }

    res.status(200).json(json_output);
})

const updateUser = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const {name,email} = req.body;
    if(!name || !email){
        res.status(400);
        throw new Error('Please eneter the mandatory fields');
    }

    //check email exist or not
    const checkEmail = await User.findOne({email:email});

    if(checkEmail && checkEmail.id != id){
        res.status(400);
        throw new Error('Email address already exist')
    }

    //update 
    const user = await User.findByIdAndUpdate(id,req.body);

    if(!user){
        res.status(404);
        throw new Error('User not found');
    }
    const json_output = {
        status:1,
        message: 'Successfully updated user'
    }

    res.status(200).json(json_output);
})


const deleteUser = asyncHandler( async (req,res) => {
   const {id} = req.params;
   const user = await User.findByIdAndDelete(id);
   if(!user){
    res.status(404);
    throw new Error('User not found');
   }

   const userList = await  User.find({})

   const json_output = {
    status:1,
    message: 'Successfully deleted User',
    userList:userList
   }

   res.status(200).json(json_output);
})

const loginUser =  asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    const userDetails = await User.findOne({email:email});

    if(userDetails && (await Bcrypt.compare(password,userDetails.password))){
        const accessToken = jwt.sign({
            user:{
                name:userDetails.name,
                email:userDetails.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'10m'
        }
    );

    const json_output = {
        status:1,
        message:"Successfully logged in",
        token: accessToken,
        user:userDetails
    }
    res.status(200).json(json_output);
    }else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
})

const currentUser = asyncHandler(async(req,res) => {
    console.log('test');
    const json_output = {
        status:1,
        user:req.user
    }
   res.status(200).json(json_output);
})

module.exports = {getUsers,getUser,addUser,updateUser,deleteUser, loginUser, currentUser}