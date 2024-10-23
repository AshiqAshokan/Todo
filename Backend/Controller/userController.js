const User=require('../Model/UserModel')
const asyncHandler = require('express-async-handler')
const CryptoJS = require("crypto-js")
const generateToken = require("../utils/generateToken")

const registerUser = asyncHandler(async(req,res)=>{
    console.log("Registration request body:", req.body);

    const {name,email,password}=req.body

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password: CryptoJS.AES.encrypt(password,process.env.PASS_KEY).toString(),
    })

    if(user){
        const token = generateToken(user._id,user.userType)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token
            })
    }

    else{
        res.status(400)
        throw new Error("Failed to create user")
    }


})

const authUser = asyncHandler(async(req,res)=>{
    console.log("Logged In")
    const {email,password}=req.body

    const user=await User.findOne({email})

    if(!user){
        res.status(400)
        throw new Error("Invalid email or password")
      }

      const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_KEY);
        

      const originalPassword=hashedPassword.toString(CryptoJS.enc.Utf8)

     
      if(originalPassword !== password){
          res.status(400)
          throw new Error("Invalid Passwords")
      }
      
      
      const accessToken=generateToken(user._id,user.userType)

      const { password: _, ...others } = user._doc;
      console.log("User data (others):", others);

      res.status(201).json({
          message:"Login Successfully",
           user: others,
          accessToken,
      }) 
})

module.exports = {registerUser,authUser}