import projectsModel from "../model/projectSectionModel.js";
import resumeModel from "../model/resumeModel.js";



// Create or Update Project
// const saveProject = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, ...projectData } = req.body;

//     let project = await projectsModel.findOne({ userId, resumeId, name: projectData.name });

//     if (project) {
//       project = await projectsModel.findOneAndUpdate(
//         { userId, resumeId, name: projectData.name },
//         projectData,
//         { new: true }
//       );
//       return res.status(200).json({ message: "Project updated", project });
//     }

//     const newProject = new projectsModel({ userId, resumeId, ...projectData });
//     await newProject.save();

//     res.status(201).json({ message: "Project saved", project: newProject });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const saveProject = async (req, res) => {
//   try {
//     // const userId = req.user.id;
//     const userId = req.body.userId; // ✅ Fixed
//     const { resumeId, ...projectData } = req.body;

//     let project = await projectsModel.findOne({ userId, resumeId, name: projectData.name });

//     if (project) {
//       project = await projectsModel.findOneAndUpdate(
//         { userId, resumeId, name: projectData.name },
//         projectData,
//         { new: true }
//       );

//       // Also update resumeModel if not already added
//       await resumeModel.findByIdAndUpdate(resumeId, {
//         $addToSet: { projects: project._id }  // avoids duplication
//       });

//       return res.status(200).json({ message: "Project updated", project });
//     }

//     const newProject = new projectsModel({ userId, resumeId, ...projectData });
//     await newProject.save();

//     // Save the new project ID into resume model
//     await resumeModel.findByIdAndUpdate(resumeId, {
//       $addToSet: { projects: newProject._id }
//     });

//     res.status(201).json({ message: "Project saved", project: newProject });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const saveProject = async (req, res) => {
  try {
    const { userId, resumeId, projects } = req.body;

    if (!Array.isArray(projects) || projects.length === 0) {
      return res.status(400).json({ error: "No projects provided" });
    }

    const savedProjects = [];

    for (const projectData of projects) {
      const existingProject = await projectsModel.findOne({
        userId,
        resumeId,
        name: projectData.name,
      });

      let project;

      if (existingProject) {
        project = await projectsModel.findOneAndUpdate(
          { userId, resumeId, name: projectData.name },
          projectData,
          { new: true }
        );
      } else {
        project = new projectsModel({ userId, resumeId, ...projectData });
        await project.save();
      }

      savedProjects.push(project._id);

      // Update resume with project ID
      await resumeModel.findByIdAndUpdate(resumeId, {
        $addToSet: { projects: project._id },
      });
    }

    res.status(201).json({ message: "Projects saved successfully", projectIds: savedProjects });

  } catch (error) {
    console.error("Error saving projects:", error);
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
