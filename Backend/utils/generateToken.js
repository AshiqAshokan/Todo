const jwt = require('jsonwebtoken')

const generateToken = (userId,userType)=>{
    const token = jwt.sign({userId,userType},process.env.SECRET_KEY,{expiresIn:'30d'})
    return token
}
module.exports = generateToken;