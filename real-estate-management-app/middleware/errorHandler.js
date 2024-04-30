const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode){
        case 400 : 
        res.json({
            title:"Validation Error",
            message:err.message,
            stackTrace: err.stack
        })
        case 404 : 
        res.json({
            title:"Page not found",
            message:err.message,
            stackTrace: err.stack
        })
        case 500 : 
        res.json({
            title:"Internal Server Error",
            message:err.message,
            stackTrace: err.stack
        })
        default:
            console.log('no error')
    }
} 

module.exports = errorHandler;