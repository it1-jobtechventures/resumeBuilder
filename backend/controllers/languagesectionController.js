import languagesModel from "../model/languageSectionModel.js";
import resumeModel from "../model/resumeModel.js";

// // Create or Update Languages
// const saveLanguages = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, languages } = req.body; // languages = [{ language: "", level: "", customLanguage: ""}, {...}]

//     if (!languages || !Array.isArray(languages)) {
//       return res.status(400).json({ message: "Invalid languages data" });
//     }

//     // Delete existing languages for the user & resumeId
//     await languagesModel.deleteMany({ userId, resumeId });

//     // Save new languages
//     const newLanguages = languages.map((language) => ({
//       userId,
//       resumeId,
//       ...language,
//     }));

//     const savedLanguages = await languagesModel.insertMany(newLanguages);

//     res.status(201).json({ message: "Languages saved successfully", languages: savedLanguages });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const saveLanguages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, languages } = req.body;

    if (!languages || !Array.isArray(languages)) {
      return res.status(400).json({ message: "Invalid languages data" });
    }

    // Delete existing languages for the user & resumeId
    await languagesModel.deleteMany({ userId, resumeId });

    // Save new languages
    const newLanguages = languages.map((language) => ({
      userId,
      resumeId,
      ...language,
    }));

    const savedLanguages = await languagesModel.insertMany(newLanguages);

    // Collect all saved _id values
    const languageIds = savedLanguages.map(lang => lang._id);

    // Update resume model
    await resumeModel.findByIdAndUpdate(resumeId, {
      $set: { language: languageIds }
    });

    res.status(201).json({ message: "Languages saved successfully", languages: savedLanguages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Languages for a Resume
const getLanguages = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const languages = await languagesModel.find({ userId, resumeId });

    if (!languages.length) return res.status(404).json({ message: "No languages found" });

    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {getLanguages , saveLanguages}