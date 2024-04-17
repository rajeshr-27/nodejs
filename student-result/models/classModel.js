const mongoose =require('mongoose');

const classSchema = mongoose.Schema({
    class_name: {
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const Class = mongoose.model('Class', classSchema);

module.exports = Class;