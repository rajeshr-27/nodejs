const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler( async(req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
   
    if(authHeader){
        token = authHeader.split(" ")[1];
        
        await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                req.statusCode = 401;
                throw new Error('User is not authorized')
            }
           
            req.user = decoded.user;
            next();
        })
    }
    if(!token){
         console.log(token);
        res.status(401);
        req.statusCode = 401;
        throw new Error('User is not authorized or invalid token')
    }
})

module.exports = validateToken;