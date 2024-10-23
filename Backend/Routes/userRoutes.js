const Router = require("express").Router()
const { registerUser,authUser } = require("../Controller/userController")
const protect = require("../middleware/authMiddleware")

Router.post('/register',registerUser)
Router.post('/login',authUser) 

module.exports=Router