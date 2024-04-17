const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ?  res.statusCode : 500;
    console.log(statusCode);
    switch(statusCode){
        case 400 :
        res.json({
            title: 'Validation failed',
            message:err.message,
            stackTrace:err.stack
        })
        case 401 :
        res.json({
            title: 'un authorized',
            message:err.message,
            stackTrace:err.stack
        })
        case 403 :
        res.json({
            title: 'forbidden',
            message:err.message,
            stackTrace:err.stack
        })
        case 404 :
        res.json({
            title: 'Not found',
            message:err.message,
            stackTrace:err.stack
        })
        case 500 :
        res.json({
            title: 'Server error',
            message:err.message,
            stackTrace:err.stack
        })
        default :
        console.log('all is good!')
    }
}

module.exports = errorHandler;