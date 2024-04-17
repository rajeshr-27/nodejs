const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Get all users
//API GET /api/users/
//Access public

const getUsers = asyncHandler( async (req,res) => {
    const users = await User.find({});

    res.status(200).json(users);
})

//@desc Create User
//API POST /api/users/
//Access public

const createUser = asyncHandler( async (req,res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('All fields Mandatory');
    }

    const checkUserAvailable = await User.findOne({email:email});
    
    if(checkUserAvailable){
        res.status(403);
        req.statusCode = 403
        throw new Error('Email id already taken');
    }

    const hashPassword = await bcrypt.hash(password,10);

    //create user
    const user = await User.create({
        username,
        email,
        password:hashPassword
    })
    res.status(200).json(user);
 })

//@desc Update  user
//API PUT /api/users/current
//Access public

const updateUser = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const {email} = req.body;
    const checkUserAvailable = await User.findOne({email:email});

    if(checkUserAvailable && checkUserAvailable.id != id){
        res.status(400);
        req.statusCode = 400;
        throw new Error('Email already taken');
    }

    //update
    await User.findByIdAndUpdate(id,req.body);

    const user  =  await User.findById(id);
    res.status(200).json(user);
 })

 //@desc Delete  user
//API DELETE /api/users/current
//Access public

const deleteUser = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);

    if(!user){
        res.status(404);
        req.statusCode = 404;
        throw new Error(`cannot find this user ${id}`);
    }

    res.status(200).json(user);
 })

//@desc Login  user
//API POST /api/users/login
//Access public

const loginUser = asyncHandler( async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if(user && bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user:{
                id:user.id,
                email:user.email,
                username:user.email
            }
        
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'10m'}
        );
        res.status(200).json({accessToken});
    }else {
        res.status(400);
        req.statusCode = 400;
        throw new Error('Invalid email or password');
    }
    
 })

 //@desc Current  user
//API POST /api/users/login
//Access private

const currentUser = asyncHandler( async (req,res) => {
    res.status(200).json(req.user);
 })

 module.exports = {getUsers,createUser,updateUser,deleteUser,loginUser,currentUser}