import internshipExperienceModel from "../model/internshipExperienceModel.js";
import resumeModel from "../model/resumeModel.js";


// Create or Update Internship
// const saveInternship = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, internships } = req.body; // internships = [{ company: "", location: "", ...}, {...}]

//     if (!internships || !Array.isArray(internships)) {
//       return res.status(400).json({ message: "Invalid internship data" });
//     }

//     // Delete existing internships for the user & resumeId
//     await internshipExperienceModel.deleteMany({ userId, resumeId });

//     // Save new internships
//     const newInternships = internships.map((internship) => ({
//       userId,
//       resumeId,
//       ...internship,
//     }));

//     const savedInternships = await internshipExperienceModel.insertMany(newInternships);

//     res.status(201).json({ message: "Internships saved successfully", internships: savedInternships });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const saveInternship = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, internships } = req.body;

    if (!internships || !Array.isArray(internships)) {
      return res.status(400).json({ message: "Invalid internship data" });
    }

    // Delete existing internships for the user & resumeId
    await internshipExperienceModel.deleteMany({ userId, resumeId });

    // Save new internships
    const newInternships = internships.map((internship) => ({
      userId,
      resumeId,
      ...internship,
    }));

    const savedInternships = await internshipExperienceModel.insertMany(newInternships);

    // Collect all IDs
    const internshipIds = savedInternships.map(intern => intern._id);

    // Update resume with internship IDs
    await resumeModel.findByIdAndUpdate(resumeId, {
      $set: { internshipExperience: internshipIds },
    });

    res.status(201).json({ message: "Internships saved successfully", internships: savedInternships });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch Internship for a Resume
const getInternships = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const internships = await internshipExperienceModel.find({ userId, resumeId });

    if (!internships.length) return res.status(404).json({ message: "No internships found" });

    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getInternships ,saveInternship}