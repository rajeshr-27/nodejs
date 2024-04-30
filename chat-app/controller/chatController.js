const asyncHandler = require('express-async-handler');
const chatMessage = require('../models/chatMessageModel');
//@desc Get All messages
//@Method GET /api/chat/message
//Access Public

const getMessages = asyncHandler( async (req, res) => {
   
    const getMessages = await chatMessage.find({});
    const json_output = {
        status:1,
        message:'fetch successfully',
        chats:getMessages
    }
    res.status(200).json(json_output);
})

const addMessage = asyncHandler( async (req, res) => {
    const {username, message} = req.body;
    if(!username || !message){
        res.status(400);
        throw new Error('Please Enter Mandatory Fields')
    }
    console.log(req.body);
    await chatMessage.create({
        username,
        message
    });

    
    const getMessages = await chatMessage.find({});
    const json_output = {
        status:1,
        message:'created successfully',
        chats:getMessages
    }
    res.status(200).json(json_output);
})

module.exports = {getMessages,addMessage}