const mongoose = require('mongoose');
const chatMessageSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const chatMessage = mongoose.model('chat_messages',chatMessageSchema);
module.exports = chatMessage;