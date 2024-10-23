const Router = require("express").Router()
const { createdTask,fetchUserTasks, updateTask, deleteTask, updateTaskStatus  } = require("../Controller/TaskController")
const protect = require("../middleware/authMiddleware")

Router.post('/', protect, createdTask);
Router.get('/fetchtask/:userId', protect, fetchUserTasks);
Router.put('/updatetask/:id', updateTask);
Router.delete('/deletetask/:id', deleteTask);
Router.patch('/updatetasksstatus/:id', updateTaskStatus);


module.exports = Router;