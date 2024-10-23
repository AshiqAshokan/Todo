const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Model/UserModel')

const protect = asyncHandler(async(req,res,next)=>{

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token=req.headers.authorization.split(' ')[1]
    }
    if(token){
        try{
            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            let user;
            let userType;
            if(decoded.userType==='User'){
                user=await User.findById(decoded.userId).select('-password')
                userType="User"
            }
            req.user=user
            req.userType=userType
            next()
        }
        catch(err){
            console.error(err)
            res.status(401)
            throw new Error('Not Authorised , Token Failed')
        }
    }
    else{
        res.status(401)
        throw new Error('Not authorized, No Token')
    }

})
module.exports = protect;