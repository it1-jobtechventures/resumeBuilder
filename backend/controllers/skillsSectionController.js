import resumeModel from "../model/resumeModel.js";
import skillsModel from "../model/skillsSectionModel.js";



// Create or Update Skills
// const saveSkills = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, skills } = req.body; // skills = [{ name: "", level: "" }, {...}]

//     if (!skills || !Array.isArray(skills)) {
//       return res.status(400).json({ message: "Invalid skills data" });
//     }

//     // Delete existing skills for the user & resumeId
//     await skillsModel.deleteMany({ userId, resumeId });

//     // Save new skills
//     const newSkills = skills.map((skill) => ({
//       userId,
//       resumeId,
//       ...skill,
//     }));

//     const savedSkills = await skillsModel.insertMany(newSkills);

//     res.status(201).json({ message: "Skills saved successfully", skills: savedSkills });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const saveSkills = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, skills } = req.body; // skills = [{ name: "", level: "" }, {...}]

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ message: "Invalid skills data" });
    }

    // Delete existing skills for the user & resumeId
    await skillsModel.deleteMany({ userId, resumeId });

    // Save new skills
    const newSkills = skills.map((skill) => ({
      userId,
      resumeId,
      ...skill,
    }));

    const savedSkills = await skillsModel.insertMany(newSkills);

    // Save all skill IDs into resume model
    const skillIds = savedSkills.map((skill) => skill._id);
    await resumeModel.findByIdAndUpdate(resumeId, {
      $set: { skill: skillIds },
    });

    res.status(201).json({ message: "Skills saved successfully", skills: savedSkills });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Skills for a Resume
const getSkills = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const skills = await skillsModel.find({ userId, resumeId });

    if (!skills.length) return res.status(404).json({ message: "No skills found" });

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getSkills , saveSkills}
