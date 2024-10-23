const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],

    },
    password:{
        type:String,
        required:true,
        minlength: 6,
    },
    userType:{
        type:String,
        default:'User'
    }
}, { timestamps:true })

const User = mongoose.model('User',userSchema)
module.exports = User;