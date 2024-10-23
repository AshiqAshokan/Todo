const Router = require("express").Router()
const { registerUser,authUser,googleSignIn } = require("../Controller/userController")
const protect = require("../middleware/authMiddleware")

Router.post('/register',registerUser)
Router.post('/login',authUser) 
Router.post('/google-signin', googleSignIn);

module.exports=Router
