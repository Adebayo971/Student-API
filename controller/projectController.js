import StudentModel from "../model/studentModel.js";
import projectModel from "../model/projectModel.js";

// create ptoject
const createProject = async (req, res) => {
  try {
    const { id } = req.params;
    const getStudentId = await StudentModel.findById(id);
    const { title, description, link, grade } = req.body;
    if (!getStudentId) {
      return res.status(404).json({
        message: "student not found",
      });
    }
    const project = await projectModel.create({
      title,
      description,
      link,
      grade,
    });
    await getStudentId.projects.push(project._id)
    await getStudentId.save()
    return res
      .status(201)
      .json({ message: "Project created succesfully", data: project });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//  get all project
const getAllProject = async (req, res) => {
  try {
    const getAll = await projectModel.find();
    if (!getAll) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({
      message: "Projects fetch succesful",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// find one project
const getOneProject = async (req, res) => {
  try {
    const { id } = req.params;
    const oneProject = await projectModel.findById(id);
    if (!oneProject) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "project is available",
      data: oneProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// update product
const updatePoduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, grade } = req.body;
    const update = await projectModel.findByIdAndUpdate(
      id,
      { title, grade },
      { new: true },
    );
    if (!update) {
      return res.status(404).json({
        message: "Product does not exist",
      });
    }
    return res.status(200).json({
      message: "Project updated succesful",
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//  delete project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProject = await projectModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "project deleted succesfully",
      data: deleteProject,
    });
  } catch (error) {
    return res.status(500).json({
        message: error.message
    })
  }
};

export { createProject, getAllProject, getOneProject, updatePoduct, deleteProject}
