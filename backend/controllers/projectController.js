import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import User from "../models/User.js";
import { generateId } from "../utils/generateId.js";

export const createProject = async (req, res) => {
  try {
    const { workspaceId, name, description, status, priority, startDate, endDate } = req.body;
    
    // 1. Create Project
    const project = await Project.create({
      id: generateId(),
      workspaceId,
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
    });

    // 2. Add Creator as Teamlead
    await ProjectMember.create({
      projectId: project._id,
      userId: req.user._id,
      role: "Teamlead",
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOneAndUpdate(
        { id: id }, // Use custom id string from params
        req.body,
        { new: true }
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMemberToProject = async (req, res) => {
  try {
    const { projectId } = req.params; // Expecting string ID from URL
    const { email } = req.body;

    // Find Project DB ID first
    const project = await Project.findOne({ id: projectId });
    if (!project) return res.status(404).json({ message: "Project not found" });

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) return res.status(404).json({ message: "User not found" });

    const exists = await ProjectMember.findOne({
      projectId: project._id,
      userId: userToAdd._id,
    });

    if (exists) return res.status(400).json({ message: "User already in project" });

    await ProjectMember.create({
      projectId: project._id,
      userId: userToAdd._id,
      role: "Contributor",
    });

    res.status(200).json({ message: "Member added to project" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};