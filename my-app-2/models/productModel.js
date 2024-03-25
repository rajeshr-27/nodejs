const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        product_name:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        qty:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;