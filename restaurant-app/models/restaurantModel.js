const mongoose = require('mongoose');
const restaurantSchema = mongoose.Schema({

    name:String,
    image:String,
    menu:[
        {
            name:String,
            price:Number,
            image:String
        }
    ],
    rating:Number
},
{
    timestamps:true
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;