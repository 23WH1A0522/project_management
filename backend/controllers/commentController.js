import Comment from "../models/Comment.js";
import Task from "../models/Task.js";

export const addComment = async (req, res) => {
  try {
    const { taskId, content } = req.body; // taskId here is likely the Mongo ObjectId or String ID
    
    // Ensure we have the Mongo _id for the task reference
    let taskObjectId = taskId;
    const task = await Task.findOne({ id: taskId }); 
    if(task) taskObjectId = task._id;

    const comment = await Comment.create({
      taskId: taskObjectId,
      userId: req.user._id,
      content,
    });

    // Populate user to return to frontend
    await comment.populate("userId", "name email");

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Find task first to get _id
    const task = await Task.findOne({ id: taskId });
    if(!task) return res.status(404).json({message: "Task not found"});

    const comments = await Comment.find({ taskId: task._id })
                              .populate("userId", "name email")
                              .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};