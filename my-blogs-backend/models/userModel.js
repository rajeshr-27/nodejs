const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: {
        type:String,
        required: [true,'Please enter the username']
    },
    email: {
        type:String,
        required: [true,'Please enter the email'],
        unique:[true, 'Email id already taken']
    },
    password: {
        type:String,
        required: [true,'Please enter the password']
    }
},
{
    timestamps: true
})

const User = mongoose.model('User',UserSchema);

module.exports = User;