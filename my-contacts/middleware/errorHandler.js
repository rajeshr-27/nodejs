
const {constants} = require('../constants');
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode :500;
    
    switch (statusCode) {
        case constants.VALIDATION_ERROR: 
        res.json({
            tile:"Validation field",
            message:err.message, 
            stackTrace:err.stack
        });
        case constants.UNAUTHERIZED:
        res.json({
            tile:"Un authorized",
            message:err.message, 
            stackTrace:err.stack
        });
        case constants.FORBIDDEN:
        res.json({
            tile:"Forbidden",
            message:err.message, 
            stackTrace:err.stack
        });
        case constants.NOT_FOUND:
        res.json({
            tile:"Not found",
            message:err.message, 
            stackTrace:err.stack
        });
        case constants.SERVER_ERROR:
        res.json({
            tile:"SERVER ERROR",
            message:err.message, 
            stackTrace:err.stack
        });
        default :
        console.log("No error, All good !")
    }
}

module.exports = errorHandler;