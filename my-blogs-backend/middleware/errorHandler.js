const errorHandler = (err,req,res,next) => {
    const statusCode = (req.statusCode) ? req.statusCode:500;
    console.log(req.statusCode);
    switch(statusCode){
        case 400 :
        res.json({
            title:"Validation field",
            message:err.message,
            stackTrace:err.stack
        });
        case 401 :
        res.json({
            title:"Un Authorized",
            message:err.message,
            stackTrace:err.stack
        });

        case 403 :
        res.json({
            title:"Forbidden error",
            message:err.message,
            stackTrace:err.stack
        });

        case 404 :
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace:err.stack
            });
        case 500 :
            res.json({
                title:"SERVER ERROR",
                message:err.message,
                stackTrace:err.stack
            });
        default:
            console.log('No error, All good !')
    }
    
}

module.exports = errorHandler;