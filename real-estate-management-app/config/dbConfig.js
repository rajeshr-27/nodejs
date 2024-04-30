const mongoose = require('mongoose');
const connectDB = async ()=>{
    try{
       const connect =  await mongoose.connect(process.env.CONNECTION_STRING);
       console.log('Mongo DB connect - ', connect.connection.name)

    }catch(err){
        console.log(err)
    }
}
module.exports = connectDB;