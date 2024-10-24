const { OAuth2Client } = require('google-auth-library');
const User=require('../Model/UserModel')
const client = new OAuth2Client('1038818047013-kbkd3pndcmp5p0hp79u9hvea1men57ip.apps.googleusercontent.com');
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

const googleSignIn = async (req, res) => {
    console.log("body contained:",req.body);
    const token = req.body.token.token;
    console.log("token getted:",token)
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '1038818047013-kbkd3pndcmp5p0hp79u9hvea1men57ip.apps.googleusercontent.com', 
        });

        const payload = ticket.getPayload();
        const { email, name } = payload;
        
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, password: 'google-sign-in', google: true });
        }
        const authToken = generateToken(user._id,user.userType)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: authToken,
            })
    
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Google sign-in failed!" });
    }
};
    

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

module.exports = {registerUser,authUser,googleSignIn}
