const Project = require("../models/ProjectModel");
const User = require("../models/UserModel");

const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(200).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(id, req.body);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    return res
      .status(200)
      .json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
