const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter the name']
    },
    email:{
        type:String,
        required:[true,'Please enter the email'],
        unique:[true,'Email address already taken']
    },
    password:{
        type:String,
        required:[true,'Please enter the password']
    }
},
{
    timestamps:true
}
) 

const User = mongoose.model('User', userSchema);

module.exports = User;