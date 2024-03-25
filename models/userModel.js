const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
    {
        first_name :{
            type: String,
            required : [true, 'Enter First Name']
        },
        last_name : {
            type: String,
            required: false
        },
        email : {
            type: String,
            required:true
        },
        password: {
            type:String,
            required: true
        },
        mobile_no : {
            type:Number,
            required:true

        },
        gender : {
            type:String,
            required: true
        },
        country : {
            type:String,
            required: true
        },
        state : {
            type:String,
            required: true
        },
        city : {
            type:String,
            required: true
        },
        address : {
            type:String,
            required: true
        },
        photo : {
            type:String,
            required: false
        }
    },
    {
        timestamps: true 
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;