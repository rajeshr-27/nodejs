const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode){
        case 400:
            res.json({
                title:"Validation field",
                message:err.message,
                stackTrace: err.stack
            });
        case 401:
            res.json({
                title:"Un Authorize",
                message:err.message,
                stackTrace: err.stack
            })
        case 403:
            res.json({
                title:"Forbidden",
                message:err.message,
                stackTrace: err.stack
            })
        case 404:
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace: err.stack
            })
        case 500:
            res.json({
                title:"Internal Server Error",
                message:err.message,
                stackTrace: err.stack
            })

        default:
            console.log('No error');
    }
}

module.exports = errorHandler;