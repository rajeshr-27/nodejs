const express = require('express');
const { getMessages, addMessage } = require('../controller/chatController');
const Router = express.Router();

Router.get('/message',getMessages)

Router.post('/message',addMessage)

module.exports = Router;