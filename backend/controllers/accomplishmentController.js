import accomplishmentModel from "../model/accomplishmentModel.js";
import resumeModel from "../model/resumeModel.js";

// // Create or Update 
// const saveAccomplishment = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, accomplishment } = req.body; 

//     if (!accomplishment || !Array.isArray(accomplishment)) {
//       return res.status(400).json({ message: "Invalid accomplishment data" });
//     }

//     // Delete existing certifications for the user & resumeId
//     await accomplishmentModel.deleteMany({ userId, resumeId });

//     // Save new certifications
//     const newAccomplishment= accomplishment.map((accomplishment) => ({
//       userId,
//       resumeId,
//       ...accomplishment,
//     }));

//     const savedAccomplishment = await accomplishmentModel.insertMany(newAccomplishment);

//     res.status(201).json({ message: "accomplishment saved successfully", accomplishment: savedAccomplishment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const saveAccomplishment = async (req, res) => {
  try {
    // const userId = req.user.id;
    // const userId = req.body.userId; // ✅ Fixed
    const { resumeId, accomplishment } = req.body;

    if (!accomplishment || !Array.isArray(accomplishment)) {
      return res.status(400).json({ message: "Invalid accomplishment data" });
    }

    // Delete existing accomplishments for the user & resumeId
    await accomplishmentModel.deleteMany({  resumeId });

    // Save new accomplishments
    const newAccomplishment = accomplishment.map((acc) => ({
      
      resumeId,
      ...acc,
    }));

    const savedAccomplishment = await accomplishmentModel.insertMany(newAccomplishment);

    // Update resume with the first accomplishment ID
    if (savedAccomplishment.length > 0) {
      await resumeModel.findByIdAndUpdate(resumeId, {
        accomplishment: savedAccomplishment[0]._id,
      });
    }

    res.status(201).json({ message: "Accomplishment saved successfully", accomplishment: savedAccomplishment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch  for a Resume
const getAccomplishment = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const accomplishments = await accomplishmentModel.find({ userId, resumeId });

    if (!accomplishments.length) return res.status(404).json({ message: "No accomplishments found" });

    res.status(200).json(accomplishments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getAccomplishment ,saveAccomplishment}
