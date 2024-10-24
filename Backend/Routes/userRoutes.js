const Router = require("express").Router()
const { registerUser,authUser,googleSignIn,googleLogin } = require("../Controller/userController")
const protect = require("../middleware/authMiddleware")

Router.post('/register',registerUser)
Router.post('/login',authUser) 
Router.post('/google-signin', googleSignIn);
Router.post('/google-signup',googleLogin);

module.exports=Router
