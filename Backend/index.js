const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv=require("dotenv")
const port =process.env.PORT || 7000
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const cors= require('cors')
dotenv.config()

const UserRoutes =require("./Routes/userRoutes")
const TaskRoutes = require("./Routes/taskRoutes")

app.use(cors({
    origin: 'http://localhost:3000' 
  }));

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/api/user',UserRoutes)
app.use('/api/tasks',TaskRoutes)


app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})