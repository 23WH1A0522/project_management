import WorkSpace from "../models/WorkSpace.js";
import WorkspaceMember from "../models/WorkspaceMember.js";
import User from "../models/User.js";
import { generateId } from "../utils/generateId.js";

// Video: getWorkspaces
export const getWorkspaces = async (req, res) => {
  try {
    const userId = req.user._id;
    // Find all workspace memberships for this user
    const memberships = await WorkspaceMember.find({ Id: userId });
    const workspaceIds = memberships.map((m) => m.workspaceId);

    // Get actual workspace details
    const workspaces = await WorkSpace.find({ _id: { $in: workspaceIds } });

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Required for MERN (Video uses Inngest/Clerk for this)
export const createWorkspace = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const workspace = await WorkSpace.create({
      id: generateId(),
      name,
      slug,
      ownerId: req.user._id,
    });

    // Add owner as Admin member
    await WorkspaceMember.create({
      workspaceId: workspace._id,
      Id: req.user._id,
      role: "Admin",
    });

    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Video: addMember
export const addMemberToWorkspace = async (req, res) => {
  try {
    const { workspaceId, email, role } = req.body;

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) return res.status(404).json({ message: "User not found" });

    const exists = await WorkspaceMember.findOne({
      workspaceId,
      Id: userToAdd._id,
    });
    if (exists) return res.status(400).json({ message: "User already in workspace" });

    await WorkspaceMember.create({
      workspaceId,
      Id: userToAdd._id,
      role,
    });

    res.status(200).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};