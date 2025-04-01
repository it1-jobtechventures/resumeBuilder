import projectsModel from "../model/projectSectionModel.js";



// Create or Update Project
const saveProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, ...projectData } = req.body;

    let project = await projectsModel.findOne({ userId, resumeId, name: projectData.name });

    if (project) {
      project = await projectsModel.findOneAndUpdate(
        { userId, resumeId, name: projectData.name },
        projectData,
        { new: true }
      );
      return res.status(200).json({ message: "Project updated", project });
    }

    const newProject = new projectsModel({ userId, resumeId, ...projectData });
    await newProject.save();

    res.status(201).json({ message: "Project saved", project: newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Projects for a Resume
const getProjects = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const projects = await projectsModel.find({ userId, resumeId });

    if (!projects.length) return res.status(404).json({ message: "No projects found" });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getProjects , saveProject}
