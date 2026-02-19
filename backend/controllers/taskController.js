import Task from "../models/Task.js";
import { generateId } from "../utils/generateId.js";

export const createTask = async (req, res) => {
  try {
    const { projectId, title, description, type, priority, status, dueDate, assigneeId } = req.body;

    const task = await Task.create({
      id: generateId(),
      projectId, // Assuming this is passed as ObjectId from frontend state, else find project first
      assignerId: req.user._id,
      assigneeId,
      title,
      description,
      type,
      priority,
      status,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Custom string ID
    const task = await Task.findOneAndUpdate(
        { id: id },
        req.body,
        { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskIds } = req.body; // Expecting array of string IDs
    
    await Task.deleteMany({ id: { $in: taskIds } });
    
    res.status(200).json({ message: "Tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};