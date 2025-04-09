import resumeModel from "../model/resumeModel.js";
import workExperienceModel from "../model/workExperienceModel.js";



// Create or Update Work Experience
// const saveWorkExperience = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, ...workExperienceData } = req.body;

//     let workExperience = await workExperienceModel.findOne({ userId, resumeId });

//     if (workExperience) {
//       workExperience = await workExperienceModel.findOneAndUpdate(
//         { userId, resumeId },
//         workExperienceData,
//         { new: true }
//       );
//       return res.status(200).json({ message: "Work Experience updated", workExperience });
//     }

//     const newWorkExperience = new workExperienceModel({ userId, resumeId, ...workExperienceData });
//     await newWorkExperience.save();

//     res.status(201).json({ message: "Work Experience saved", workExperience: newWorkExperience });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const saveWorkExperience = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, ...workExperienceData } = req.body;

    let workExperience = await workExperienceModel.findOne({ userId, resumeId, company: workExperienceData.company });

    if (workExperience) {
      workExperience = await workExperienceModel.findOneAndUpdate(
        { userId, resumeId, company: workExperienceData.company },
        workExperienceData,
        { new: true }
      );
      return res.status(200).json({ message: "Work Experience updated", workExperience });
    }

    const newWorkExperience = new workExperienceModel({ userId, resumeId, ...workExperienceData });
    const savedWork = await newWorkExperience.save();

    // Add the new work experience ID to resume model's array
    await resumeModel.findByIdAndUpdate(resumeId, {
      $push: { workExperience: savedWork._id }
    });

    res.status(201).json({ message: "Work Experience saved", workExperience: savedWork });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Work Experience for a Resume
const getWorkExperience = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const workExperience = await workExperienceModel.find({ userId, resumeId });

    if (!workExperience.length) return res.status(404).json({ message: "Work Experience not found" });

    res.status(200).json(workExperience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {saveWorkExperience , getWorkExperience}