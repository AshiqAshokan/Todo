const Task = require("../Model/TaskModel")
const asyncHandler = require("express-async-handler")

const createdTask = asyncHandler(async(req,res)=>{

    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error("Please provide both title and description.");
      }

    const task = new Task({
        title,
        description,
        createdBy: req.user._id, 
      });
      await task.save();
      if(task){
        res.status(201).json({message: "Task created successfully", task})
      }
      else{
        res.status(400)
        throw new Error("failed to add task")
      }
})

const fetchUserTasks = async (req, res) => {
    const { userId } = req.params;
    const createdBy = userId

    try {
        const tasks = await Task.find({ createdBy }); 
        res.status(200).json(tasks); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Task.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateTaskStatus = async (req, res) => {
    console.log("hello i am here")

    const { id } = req.params;
    const { status } = req.body; 
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(updatedTask);
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createdTask,fetchUserTasks,updateTask, deleteTask,updateTaskStatus };