import resumeModel from "../model/resumeModel.js";
import softwareInfoModel from "../model/softwareInfoModel.js";


// // Create or Update Software Info
// const saveSoftwareInfo = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, softwareSkills } = req.body; // [{ name: "Linux", rating: 5 }, { name: "Windows", rating: 5 }]

//     if (!resumeId || !softwareSkills) {
//       return res.status(400).json({ message: "Resume ID and software skills are required" });
//     }

//     // Upsert (update if exists, otherwise create new)
//     const updatedSoftwareInfo = await softwareInfoModel.findOneAndUpdate(
//       { userId, resumeId },
//       { userId, resumeId, softwareSkills },
//       { new: true, upsert: true }
//     );

//     res.status(201).json({ message: "Software info saved", softwareInfo: updatedSoftwareInfo });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const saveSoftwareInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, softwareSkills } = req.body;

    if (!resumeId || !softwareSkills) {
      return res.status(400).json({ message: "Resume ID and software skills are required" });
    }

    // Upsert software info
    const updatedSoftwareInfo = await softwareInfoModel.findOneAndUpdate(
      { userId, resumeId },
      { userId, resumeId, softwareSkills },
      { new: true, upsert: true }
    );

    // Save reference to resume model
    await resumeModel.findByIdAndUpdate(resumeId, {
      $set: { softwareInfo: updatedSoftwareInfo._id },
    });

    res.status(201).json({ message: "Software info saved", softwareInfo: updatedSoftwareInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Software Info for a Resume
const getSoftwareInfo = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const softwareInfo = await softwareInfoModel.findOne({ userId, resumeId });

    if (!softwareInfo) return res.status(404).json({ message: "No software info found" });

    res.status(200).json(softwareInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getSoftwareInfo , saveSoftwareInfo}