
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc Register the user
//route POST /api/users/register
//access public

const register = asyncHandler(async(req,res) => {
    const {username,email,password} = req.body
    if(!username ||  !email || !password){
        res.status(400);
        throw new Error('All field is mandatory !');
    }
    const checkUserAvailable = await User.findOne({email});
    if(checkUserAvailable){
        res.status(400);
        throw new Error('Email address already taken');
    }
    const hashPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
        username,
        email,
        password:hashPassword
    });

    console.log(`User created succssfully ${user}`);

    if(user){
        res.status(200).json({
            id:user._id,
            email:user.email
        })
    }else {
        res.status(400);
        throw new Error('User data us not valid')
    }

    //  res.json({message:'Register the user'})
})

//@desc Login the user
//route POST /api/users/login
//access public

const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('All fields Mandatory')
    }
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        //create access token
        const accessTokn = jwt.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                }                
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'}
        );
        res.status(200).json({accessTokn});

    }else {
        res.status(400);
        throw new Error('Email or Password invalid');
    }
    res.json({message:'login the user'})
})

//@desc Register the user
//route GET /api/users/current
//access private

const currentUser = asyncHandler(async(req,res) => {
    res.json(req.user)
})


module.exports = {register,loginUser,currentUser}