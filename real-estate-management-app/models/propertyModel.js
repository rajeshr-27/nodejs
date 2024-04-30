const mongoose = require('mongoose');
const propertySchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    contact_no:{
        type:String,
        required:true
    },
    photo:{
        type:String
    }
},{
    timestamps : true
})

const Property = mongoose.model('properties', propertySchema);

module.exports = Property;